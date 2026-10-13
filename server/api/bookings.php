<?php
require_once __DIR__ . '/bootstrap.php';

// Rate limit: max 5 booking submissions per minute per IP
checkRateLimit('booking', 5);

$input = requireJsonRequest();
$fields = [];
$name = cleanText($input['customerName'] ?? '', 120);
$phone = cleanText($input['phone'] ?? '', 40);
$email = cleanText($input['email'] ?? '', 254);
$trip = cleanText($input['destination'] ?? '', 180);
$pickup = cleanText($input['pickupLocation'] ?? '', 255);
$date = cleanText($input['travelDate'] ?? '', 10);
$vehicle = cleanText($input['vehiclePreference'] ?? '', 80);
$notes = cleanText($input['notes'] ?? '', 2000);
$passengers = filter_var($input['passengers'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 17]]);
$returnTrip = !empty($input['returnTrip']) ? 1 : 0;
$returnDate = cleanText($input['returnDate'] ?? '', 10);

if (mb_strlen($name) < 2) $fields['customerName'] = 'Enter your name.';
if (!preg_match('/^[0-9+() .-]{7,40}$/', $phone)) $fields['phone'] = 'Enter a valid phone number.';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $fields['email'] = 'Enter a valid email address.';
if ($trip === '') $fields['destination'] = 'Choose or enter a destination.';
if ($pickup === '') $fields['pickupLocation'] = 'Enter a pickup location.';
$travel = DateTimeImmutable::createFromFormat('!Y-m-d', $date);
if (!$travel || $travel->format('Y-m-d') !== $date || $date < date('Y-m-d')) $fields['travelDate'] = 'Choose today or a future travel date.';
if ($passengers === false) $fields['passengers'] = 'Enter between 1 and 17 passengers.';
if ($returnTrip) {
    $return = DateTimeImmutable::createFromFormat('!Y-m-d', $returnDate);
    if (!$return || $return->format('Y-m-d') !== $returnDate || $returnDate < $date) $fields['returnDate'] = 'Choose a return date on or after travel.';
} else $returnDate = null;
if ($fields) errorResponse(422, 'VALIDATION_ERROR', 'Please check the highlighted fields.', $fields);

try {
    $connection = getDatabaseConnection();
    $reference = 'JM-' . strtoupper(bin2hex(random_bytes(5)));
    $statement = $connection->prepare('INSERT INTO bookings (public_reference, customer_name, phone, email, trip_label, travel_date, pickup_location, passengers, vehicle_preference, return_trip, return_date, notes, status) VALUES (?, ?, ?, NULLIF(?, \'\'), ?, ?, ?, ?, NULLIF(?, \'\'), ?, ?, NULLIF(?, \'\'), \'new\')');
    $statement->bind_param('sssssssisiss', $reference, $name, $phone, $email, $trip, $date, $pickup, $passengers, $vehicle, $returnTrip, $returnDate, $notes);
    $statement->execute();
    successResponse(201, ['reference' => $reference]);
} catch (Throwable $exception) {
    error_log('Booking create failed: ' . $exception->getMessage());
    errorResponse(500, 'BOOKING_UNAVAILABLE', 'We could not save your request. Please try again or contact us directly.');
}
