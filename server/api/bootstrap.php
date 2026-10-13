<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// ─── Content type & cache ────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// ─── Rate limiting via simple IP-based throttle (file-based, no Redis needed) ──
function checkRateLimit(string $action, int $maxPerMinute = 20): void {
    $dir = sys_get_temp_dir() . '/jm_rate/';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $ip   = preg_replace('/[^a-fA-F0-9:.]+/', '', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $key  = $dir . md5($action . $ip);
    $now  = time();
    $data = [];

    if (is_file($key)) {
        $raw = @file_get_contents($key);
        $data = $raw ? json_decode($raw, true) : [];
        if (!is_array($data)) $data = [];
    }

    // Keep only requests within the last 60 seconds
    $data = array_filter($data, fn($t) => $t > $now - 60);

    if (count($data) >= $maxPerMinute) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => ['code' => 'RATE_LIMITED', 'message' => 'Too many requests. Please wait a moment and try again.']]);
        exit;
    }

    $data[] = $now;
    @file_put_contents($key, json_encode(array_values($data)), LOCK_EX);
}

// ─── Response helpers ────────────────────────────────────────────────────────
function jsonResponse(int $status, mixed $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function successResponse(int $status, mixed $data): never {
    jsonResponse($status, ['success' => true, 'data' => $data]);
}

function errorResponse(int $status, string $code, string $message, array $fields = []): never {
    $error = ['code' => $code, 'message' => $message];
    if ($fields) $error['fields'] = $fields;
    jsonResponse($status, ['success' => false, 'error' => $error]);
}

function requireGetRequest(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        header('Allow: GET');
        errorResponse(405, 'METHOD_NOT_ALLOWED', 'Only GET requests are supported.');
    }
}

function getDatabaseConnection(): mysqli {
    try {
        require __DIR__ . '/../config/database.php';
    } catch (Throwable $exception) {
        error_log('[JM] DB connection failed: ' . $exception->getMessage());
        errorResponse(503, 'SERVICE_UNAVAILABLE', 'The service is temporarily unavailable. Please try again later.');
    }
    if (!($connection instanceof mysqli)) {
        errorResponse(503, 'SERVICE_UNAVAILABLE', 'Database connection is not available.');
    }
    return $connection;
}

function requireJsonRequest(string $method = 'POST'): array {
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        header('Allow: ' . $method);
        errorResponse(405, 'METHOD_NOT_ALLOWED', 'This request method is not allowed.');
    }
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== 0) {
        errorResponse(415, 'UNSUPPORTED_MEDIA_TYPE', 'Please send JSON data.');
    }
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 12000) {
        errorResponse(413, 'PAYLOAD_TOO_LARGE', 'The submitted data is too large.');
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        errorResponse(400, 'INVALID_JSON', 'The submitted data could not be read.');
    }
    return $data;
}

function cleanText(mixed $value, int $limit): string {
    return mb_substr(trim((string) $value), 0, $limit);
}

function destinationImageUrl(mixed $path): string {
    if (is_string($path) && preg_match('~^https?://~i', $path)) {
        return $path;
    }
    $path = str_replace('\\', '/', (string) $path);
    $path = preg_replace('~^(?:\.\.?/)+~', '', $path);
    return applicationBasePath() . '/' . ltrim($path, '/');
}

function applicationBasePath(): string {
    $scriptName = isset($_SERVER['SCRIPT_NAME'])
        ? str_replace('\\', '/', $_SERVER['SCRIPT_NAME'])
        : '/api/index.php';
    $basePath = str_replace('\\', '/', dirname(dirname($scriptName)));
    if ($basePath === '.' || $basePath === '/') {
        return '';
    }
    return rtrim($basePath, '/');
}
