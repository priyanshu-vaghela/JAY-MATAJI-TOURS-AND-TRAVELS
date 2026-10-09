<?php
// Database connection
$host = getenv('DB_HOST') ?: 'localhost';
$user = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';
$dbname = getenv('DB_NAME') ?: 'jay_mataji';

$connection = mysqli_connect($host, $user, $password, $dbname);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
