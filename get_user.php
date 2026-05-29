<?php
session_start();
header('Content-Type: application/json');
include 'db.php';

$user_id = null;
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} elseif (isset($_GET['id']) && ctype_digit($_GET['id'])) {
    $user_id = (int) $_GET['id'];
}

if (!$user_id) {
    echo json_encode(['success' => false, 'error' => 'Usuário não logado']);
    exit;
}


$stmt = $conn->prepare("SELECT nome, email, data_nascimento, idade, ocupacao FROM usuarios WHERE id = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Usuário não encontrado']);
    exit;
}

$user = $result->fetch_assoc();

echo json_encode(['success' => true, 'user' => $user]);

$conn->close();
?>