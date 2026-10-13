<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function jsonResponse($status, $payload)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function successResponse($status, $data)
{
    jsonResponse($status, ['success' => true, 'data' => $data]);
}

function errorResponse($status, $code, $message, $fields = [])
{
    $error = ['code' => $code, 'message' => $message];
    if ($fields) $error['fields'] = $fields;
    jsonResponse($status, ['success' => false, 'error' => $error]);
}

function requireGetRequest()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        header('Allow: GET');
        jsonResponse(405, ['error' => 'Only GET requests are supported.']);
    }
}

function getDatabaseConnection()
{
    try {
        require __DIR__ . '/../config/database.php';
    } catch (Throwable $exception) {
        error_log('Application database connection failed: ' . $exception->getMessage());
        errorResponse(500, 'SERVICE_UNAVAILABLE', 'The service is temporarily unavailable. Please try again later.');
    }

    if (!$connection instanceof mysqli) {
        jsonResponse(500, ['error' => 'Destination data is temporarily unavailable.']);
    }

    return $connection;
}

function requireJsonRequest($method = 'POST')
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        header('Allow: ' . $method);
        errorResponse(405, 'METHOD_NOT_ALLOWED', 'This request method is not allowed.');
    }
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== 0) errorResponse(415, 'UNSUPPORTED_MEDIA_TYPE', 'Please send JSON data.');
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 12000) errorResponse(413, 'PAYLOAD_TOO_LARGE', 'The submitted data is too large.');
    $data = json_decode($raw, true);
    if (!is_array($data)) errorResponse(400, 'INVALID_JSON', 'The submitted data could not be read.');
    return $data;
}

function cleanText($value, $limit)
{
    return mb_substr(trim((string) $value), 0, $limit);
}

function destinationImageUrl($path)
{
    if (is_string($path) && preg_match('~^https?://~i', $path)) {
        return $path;
    }

    $path = str_replace('\\', '/', (string) $path);
    $path = preg_replace('~^(?:\.\.?/)+~', '', $path);

    return applicationBasePath() . '/' . ltrim($path, '/');
}

function applicationBasePath()
{
    $scriptName = isset($_SERVER['SCRIPT_NAME'])
        ? str_replace('\\', '/', $_SERVER['SCRIPT_NAME'])
        : '/api/index.php';
    $basePath = str_replace('\\', '/', dirname(dirname($scriptName)));

    if ($basePath === '.' || $basePath === '/') {
        return '';
    }

    return rtrim($basePath, '/');
}
