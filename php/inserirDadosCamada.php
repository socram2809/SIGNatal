<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */
include 'conexao.php';

$tabela = $_POST['tabela'];

$array = $_POST['geom'];

$geom = json_encode($array);

$valores = json_decode(stripslashes($_POST['valores']));

$fieldstr = "nextval('".$tabela."_seq'),ST_Transform(ST_SetSRID(ST_Multi(ST_GeomFromGeoJSON('$geom')),4674),31985) ";

for($i = 0; $i < count($valores) ; $i++) {
    $fieldstr = $fieldstr.",'$valores[$i]' ";
}

//Cria SQL
$sql = "INSERT INTO $tabela VALUES ($fieldstr)";

//Envia a query
if (!$response = pg_query($conn, $sql)) {
    echo "Ocorreu um erro na query.\n";
    exit;
}

pg_close($conn);

?>

