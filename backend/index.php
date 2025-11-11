<?php
header("Content-Type: application/json");

// Permitir CORS para desarrollo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Ruta básica de routing
if ($method === 'GET' && $uri === '/cart') {
    echo file_get_contents(__DIR__ . '/data/cart.json');
    exit;
}

if ($method === 'GET' && $uri === '/payment-methods') {
    echo file_get_contents(__DIR__ . '/data/payment-methods.json');
    exit;
}

if ($method === 'POST' && $uri === '/pay') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate data
    if (!isset($input['cart']) || !isset($input['shipping']) || !isset($input['payment'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Simular éxito o fallo aleatorio
    $success = rand(0, 1) === 1;
    if ($success) {
        echo json_encode(["status" => "success", "message" => "Payment processed successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Payment failed"]);
    }
    exit;
}

// Ruta no encontrada
http_response_code(404);
echo json_encode(["status" => "error", "message" => "Endpoint not found"]);
