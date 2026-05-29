<?php
header('Content-Type: application/json');
include 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $stmt = $conn->prepare("INSERT INTO metas (nome_meta, valor_total, valor_guardado, descricao, imagem_url) VALUES (?, ?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => $conn->error]);
        exit;
    }

    $stmt->bind_param("sddss",
        $data['nome'],
        $data['valorTotal'],
        $data['valorAtual'],
        $data['descricao'],
        $data['iconeURL']
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Dados não recebidos pelo PHP']);
}
?>