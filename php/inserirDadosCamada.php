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

$fieldstr = "ST_Transform(ST_SetSRID(ST_Multi(ST_GeomFromGeoJSON('$geom')),4674),31985)";

//Cria SQL
$sql = "INSERT INTO $tabela (geom) VALUES ($fieldstr)";

//Envia a query
if (!$response = pg_query($conn, $sql)) {
    echo "Ocorreu um erro na query.\n";
    exit;
}

pg_close($conn);

?>

