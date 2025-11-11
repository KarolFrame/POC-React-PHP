<?php
header("Content-Type: application/json");

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// --- ENDPOINT: /cart ---
if ($method === 'GET' && $uri === '/cart') {
    // Return cart data from a JSON file
    echo file_get_contents(__DIR__ . '/data/cart.json');
    exit;
}

// --- ENDPOINT: /payment-methods ---
if ($method === 'GET' && $uri === '/payment-methods') {
    // Return payment methods from a JSON file
    echo file_get_contents(__DIR__ . '/data/payment-methods.json');
    exit;
}

// --- ENDPOINT: /pay ---
if ($method === 'POST' && $uri === '/pay') {
    // Decode JSON payload from the request body
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate incoming data
    if (!isset($input['cart']) || !isset($input['shipping']) || !isset($input['payment'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Simulate random payment success/failure
    $success = rand(0, 1) === 1;
    if ($success) {
        echo json_encode(["status" => "success", "message" => "Payment processed successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Payment failed"]);
    }
    exit;
}

// --- Default 404 Response ---
http_response_code(404);
echo json_encode(["status" => "error", "message" => "Endpoint not found"]);
