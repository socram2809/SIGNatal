<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */

include 'conexao.php';

$tabela = $_POST['tabela'];

$id = $_POST['id'];

$array = $_POST['geom'];

$geom = json_encode($array);

$valores = json_decode(stripslashes($_POST['valores']));

$campos = json_decode(stripslashes($_POST['campos']));

//Cláusula WHERE
$where = "object_id = $id";

$fieldstr = "";

for($i = 0; $i < count($valores) ; $i++) {
    $fieldstr = $fieldstr."$campos[$i] = '$valores[$i]'";
    if($i != (count($valores)-1)){
        $fieldstr = $fieldstr.", ";
    }
}

//Cria SQL
$sql = "UPDATE $tabela SET $fieldstr WHERE $where";

//Envia a query
if (!$response = pg_query($conn, $sql)) {
    echo "Ocorreu um erro na query.\n";
    exit;
}

pg_close($conn);

?>