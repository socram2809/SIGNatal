<?php

//Pega a tabela, caso passado como parâmetro
if(isset($_GET['table'])){
    $table = $_GET['table'];
}

//Se é uma query, adiciona para o SQL
if (isset($_GET['featname'])){
    
        //Transforma campos do array em uma string formatada
        $fieldstr = "";
        foreach ($fields as $i => $field){
                $fieldstr = $fieldstr . "l.$field, ";
        }

        //Pega a geometria como geojson em SIRGAS 2000
        $fieldstr = $fieldstr . "ST_AsGeoJSON(ST_Transform(l.geom,4674))";

        //Cria SQL básico
        $sql = "SELECT $fieldstr FROM $table l";
        
	$featname = $_GET['featname'];
	$distance = $_GET['distance'] * 1000; //change km to meters

	//join for spatial query - table geom is in EPSG:26916
	$sql = $sql . " LEFT JOIN $table r ON ST_DWithin(l.geom, r.geom, $distance) WHERE r.featname = '$featname';";
        
        // echo $sql;

    //Envia a query
    if (!$response = pg_query($conn, $sql)) {
            echo "Ocorreu um erro na query.\n";
            exit;
    }

    //Faz echo dos dados direto para o DOM
    while ($row = pg_fetch_row($response)) {
            foreach ($row as $i => $attr){
                    echo $attr.", ";
            }
            echo ";";
    }
}

?> 