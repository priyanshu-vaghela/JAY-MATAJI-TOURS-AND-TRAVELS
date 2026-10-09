<?php

require __DIR__ . '/bootstrap.php';
requireGetRequest();

$id = filter_var(
    isset($_GET['id']) ? $_GET['id'] : null,
    FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1]]
);

if ($id === false || $id === null) {
    jsonResponse(400, ['error' => 'A valid destination ID is required.']);
}

try {
    $connection = getDatabaseConnection();
    $statement = $connection->prepare(
        'SELECT id, name, location, image, rating, description, best_time, famous_for
         FROM destinations_details WHERE id = ?'
    );
    $statement->bind_param('i', $id);
    $statement->execute();
    $destination = $statement->get_result()->fetch_assoc();
    $statement->close();

    if (!$destination) {
        jsonResponse(404, ['error' => 'Destination not found.']);
    }

    $destination['id'] = (int) $destination['id'];
    $destination['rating'] = (int) $destination['rating'];
    $destination['image'] = destinationImageUrl($destination['image']);

    $statement = $connection->prepare(
        'SELECT name, description FROM key_attractions WHERE destination_id = ? ORDER BY id'
    );
    $statement->bind_param('i', $id);
    $statement->execute();
    $result = $statement->get_result();
    $attractions = [];

    while ($attraction = $result->fetch_assoc()) {
        $attractions[] = $attraction;
    }

    $statement->close();
    jsonResponse(200, [
        'destination' => $destination,
        'attractions' => $attractions,
    ]);
} catch (mysqli_sql_exception $exception) {
    error_log('Destination API detail query failed: ' . $exception->getMessage());
    jsonResponse(500, ['error' => 'Destination details are temporarily unavailable.']);
}
