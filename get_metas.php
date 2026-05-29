<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'db.php';

$resultado = $conn->query(
    "SELECT id, nome_meta, valor_total, valor_guardado, descricao, imagem_url
     FROM metas
     ORDER BY id DESC"
);

if (!$resultado) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$metas = [];

while ($row = $resultado->fetch_assoc()) {
    $metas[] = [
        'id' => $row['id'],
        'nome' => $row['nome_meta'],
        'valorTotal' => (float) $row['valor_total'],
        'valorAtual' => (float) $row['valor_guardado'],
        'descricao' => $row['descricao'],
        'iconeURL' => $row['imagem_url'],
        'progresso' => min(($row['valor_guardado'] / $row['valor_total']) * 100, 100)
    ];
}

echo json_encode(['success' => true, 'metas' => $metas]);
exit;
?>