<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */

include 'conexao.php';

$table = $_GET['tabela'];

$legenda = $_GET['legenda'];
    
//Transforma campos do array em uma string formatada
$fieldstr = "";

//Pega a geometria como geojson em SIRGAS 2000
$fieldstr = $fieldstr . "l.*,ST_AsGeoJSON(ST_Transform(l.geom,4674))";

//Cria SQL básico
$sql = "SELECT $fieldstr FROM $table l";

//Envia a query
if (!$response = pg_query($conn, $sql)) {
    echo "Ocorreu um erro na query.\n";
    exit;
}

//Retorna os campos
$fields = array();
$i = pg_num_fields($response);
for ($j = 1; $j < ($i - 1); $j++) {
    if($j != 1){
        $fieldname = pg_field_name($response, $j);
        $fields[] = $fieldname;
    }
}

//Faz echo dos dados direto para o DOM
while ($row = pg_fetch_row($response)) {
    foreach ($row as $i => $attr){
            echo $attr.", ";
    }
    echo ";";
}
echo json_encode($fields).", ;".$table.", ;".$legenda;

pg_close($conn);

?>