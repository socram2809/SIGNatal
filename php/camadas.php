<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */

$sql = "SELECT * FROM camada";

if (!$camadas = pg_query($conn, $sql)) {
        echo "Ocorreu um erro na query.\n";
        exit;
}

pg_close($conn);

?>

