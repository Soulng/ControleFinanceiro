<?php
header('Content-Type: application/json');
include 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data && isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM metas WHERE id = ?");

    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'ID não fornecido']);
}
?>