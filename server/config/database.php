<?php
// Set these values in your hosting control panel. PHP does not load .env files by itself.
$host = getenv('DB_HOST') ?: 'localhost';
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME') ?: 'jay_mataji';

if ($user === false || $user === '' || $password === false || $password === '') {
    throw new RuntimeException('Database credentials are not configured.');
}

$connection = mysqli_connect($host, $user, $password, $dbname);
if (!$connection) {
    throw new RuntimeException('Database connection failed.');
}
$connection->set_charset('utf8mb4');
?>
