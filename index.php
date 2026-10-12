<?php
$reactEntry = __DIR__ . '/build/index.html';

if (!is_file($reactEntry)) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo "The React site has not been built yet. Run npm install and npm run build.";
    exit;
}

$indexContent = file_get_contents($reactEntry);

if ($indexContent === false) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'The React site could not be loaded.';
    exit;
}

$scriptName = isset($_SERVER['SCRIPT_NAME']) ? str_replace('\\', '/', $_SERVER['SCRIPT_NAME']) : '/index.php';
$siteBasePath = str_replace('\\', '/', dirname($scriptName));
$siteBasePath = $siteBasePath === '.' || $siteBasePath === '/' ? '' : rtrim($siteBasePath, '/');
$indexContent = str_replace('/build/', $siteBasePath . '/build/', $indexContent);
$indexContent = str_replace('content="/assets/', 'content="' . $siteBasePath . '/assets/', $indexContent);
$indexContent = str_replace(
    "window.__APP_BASE_PATH__ = '';",
    'window.__APP_BASE_PATH__ = ' . json_encode($siteBasePath, JSON_UNESCAPED_SLASHES) . ';',
    $indexContent
);

header('Content-Type: text/html; charset=utf-8');
echo $indexContent;
