<?php
// Set these values in your hosting control panel. PHP does not load .env files by itself.
$host = getenv('DB_HOST') ?: 'localhost';
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME') ?: 'jay_mataji';

if ($user === false || $user === '' || $password === false || $password === '') {
    http_response_code(500);
    exit('Database credentials are not configured. Set DB_USER and DB_PASSWORD in the hosting control panel.');
}

$connection = mysqli_connect($host, $user, $password, $dbname);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
