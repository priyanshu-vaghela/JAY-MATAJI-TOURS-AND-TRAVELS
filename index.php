<?php
/**
 * Production entry point — serves the compiled React app.
 * In development, Vite dev server handles this directly.
 */

// ─── Error display control ───────────────────────────────────────────────────
// In production, errors should NEVER be shown to visitors.
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
error_reporting(E_ALL);
ini_set('log_errors', '1');

$reactEntry = __DIR__ . '/build/index.html';

// ─── Check build exists ───────────────────────────────────────────────────────
if (!is_file($reactEntry)) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    header('Retry-After: 60');
    echo "The site is temporarily unavailable for maintenance. Please try again shortly.";
    exit;
}

$indexContent = file_get_contents($reactEntry);

if ($indexContent === false) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'An error occurred loading the application.';
    exit;
}

// ─── Base path injection (supports subdirectory hosting) ─────────────────────
$scriptName  = isset($_SERVER['SCRIPT_NAME']) ? str_replace('\\', '/', $_SERVER['SCRIPT_NAME']) : '/index.php';
$siteBasePath = str_replace('\\', '/', dirname($scriptName));
$siteBasePath = ($siteBasePath === '.' || $siteBasePath === '/') ? '' : rtrim($siteBasePath, '/');

// Patch asset paths and inject runtime base path for the React router
$indexContent = str_replace('/build/', $siteBasePath . '/build/', $indexContent);
$indexContent = str_replace('content="https://www.jaymatajitours.com/assets/', 'content="' . $siteBasePath . '/assets/', $indexContent);
$indexContent = str_replace(
    "window.__APP_BASE_PATH__ = '';",
    'window.__APP_BASE_PATH__ = ' . json_encode($siteBasePath, JSON_UNESCAPED_SLASHES) . ';',
    $indexContent
);

// ─── Security & cache headers ────────────────────────────────────────────────
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

echo $indexContent;
