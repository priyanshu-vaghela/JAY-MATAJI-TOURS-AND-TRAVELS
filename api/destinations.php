<?php

require __DIR__ . '/bootstrap.php';
requireGetRequest();

try {
    $connection = getDatabaseConnection();
    $result = $connection->query(
        'SELECT id, name, location, image, rating, description FROM destinations ORDER BY id LIMIT 100'
    );
    $destinations = [];

    while ($destination = $result->fetch_assoc()) {
        $destination['id'] = (int) $destination['id'];
        $destination['rating'] = (int) $destination['rating'];
        $destination['image'] = destinationImageUrl($destination['image']);
        $destinations[] = $destination;
    }

    jsonResponse(200, ['destinations' => $destinations]);
} catch (mysqli_sql_exception $exception) {
    error_log('Destination API list query failed: ' . $exception->getMessage());
    jsonResponse(500, ['error' => 'Destination data is temporarily unavailable.']);
}
