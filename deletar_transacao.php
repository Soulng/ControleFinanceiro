<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['codigo'])) {
    $codigo = $data['codigo'];

    // Prepara a query para deletar pelo código (ID)
    $stmt = $conn->prepare("DELETE FROM transacoes WHERE codigo = ?");
    $stmt->bind_param("s", $codigo); // "s" porque seu código é gerado pelo Date.now() (string/long)

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Código não enviado']);
}
exit;