<?php
// validatepen.php
header('Content-Type: application/json');

// Get the PIN sent by JS
$pin = $_POST['pincode'] ?? '';

// Your Logic
$validPins = ['9999', '9998', '9997'];

if (in_array($pin, $validPins)) {
    // Return Success
    echo json_encode(['valid' => true]);
} else {
    // Return Failure
    echo json_encode(['valid' => false]);
}
?>