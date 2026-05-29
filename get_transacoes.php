<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'db.php';

$resultado = $conn->query(
    "SELECT codigo, data_reg, descricao, categoria, tipo, valor
     FROM transacoes
     ORDER BY data_reg DESC"
);

if (!$resultado) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$transacoes = [];

while ($row = $resultado->fetch_assoc()) {
    // Usamos strtolower (mais seguro para servidores básicos)
    $tipoRaw = strtolower(trim($row['tipo']));

    // Mapeia os valores que você tem no banco (Gasto/Renda ou option1/option2)
    if ($tipoRaw === 'renda' || $tipoRaw === 'option2' || $tipoRaw === 'receita') {
        $tipoNorm = 'receita';
    } else {
        $tipoNorm = 'despesa';
    }

    $transacoes[] = [
        'codigo'    => $row['codigo'],
        'data'      => $row['data_reg'],
        'descricao' => $row['descricao'],
        'categoria' => $row['categoria'],
        'tipo'      => $tipoNorm, 
        'valor'     => (float) $row['valor'],
    ];
}

// Envia apenas o JSON e encerra o script imediatamente
echo json_encode(['success' => true, 'transacoes' => $transacoes]);
exit; 
 