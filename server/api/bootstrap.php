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
    } catch (mysqli_sql_exception $exception) {
        error_log('Destination API database connection failed: ' . $exception->getMessage());
        jsonResponse(500, ['error' => 'Destination data is temporarily unavailable.']);
    }

    if (!$connection instanceof mysqli) {
        jsonResponse(500, ['error' => 'Destination data is temporarily unavailable.']);
    }

    return $connection;
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
    $basePath = dirname(dirname($scriptName));

    if ($basePath === '.' || $basePath === '/') {
        return '';
    }

    return rtrim($basePath, '/');
}
