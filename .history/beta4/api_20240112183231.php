<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "seu_usuario", "sua_senha", "igreja");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// CREATE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $livro = $data['livro'];
    $capitulo = $data['capitulo'];
    $versiculo = $data['versiculo'];
    $nome = $data['nome'];
    $auxiliar = $data['auxiliar'];
    $data_culto = $data['data_culto'];

    $sql = "INSERT INTO versiculos (livro, capitulo, versiculo, nome, auxiliar, data_culto) VALUES ('$livro', $capitulo, $versiculo, '$nome', '$auxiliar', '$data_culto')";
    $result = $conn->query($sql);

    if ($result) {
        echo json_encode(["message" => "Versículo registrado com sucesso."]);
    } else {
        echo json_encode(["error" => "Erro ao registrar versículo."]);
    }
}

// READ
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM versiculos ORDER BY data_culto";
    $result = $conn->query($sql);

    $versiculos = [];
    while ($row = $result->fetch_assoc()) {
        $versiculos[] = $row;
    }

    echo json_encode($versiculos);
}

// UPDATE
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Implementar conforme necessário
}

// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Implementar conforme necessário
}

$conn->close();
?>
