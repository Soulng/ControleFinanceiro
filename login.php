<?php
header('Content-Type: application/json');
include 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Dados não recebidos']);
    exit;
}

$email = isset($data['email']) ? trim($data['email']) : '';
$senha = isset($data['senha']) ? $data['senha'] : '';

if (!$email || !$senha) {
    echo json_encode(['success' => false, 'error' => 'Email e senha são obrigatórios']);
    exit;
}

$stmt = $conn->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Email não encontrado']);
    exit;
}

$row = $result->fetch_assoc();
if ($senha !== $row['senha']) {
    echo json_encode(['success' => false, 'error' => 'Senha incorreta']);
    exit;
}

// Login successful
session_start();
$_SESSION['user_id'] = $row['id'];
$_SESSION['user_name'] = $row['nome'];

echo json_encode(['success' => true, 'user_id' => $row['id'], 'user_name' => $row['nome']]);

$conn->close();
?>