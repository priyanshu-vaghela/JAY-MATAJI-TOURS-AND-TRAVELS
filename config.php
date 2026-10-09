<?php
// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'jay_mataji';

$connection = mysqli_connect($host, $user, $password, $dbname);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>