<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */

$sql = "SELECT c.*, l.* FROM camada c INNER JOIN legenda l ON c.cor_camada = l.id";

if (!$camadas = pg_query($conn, $sql)) {
        echo "Ocorreu um erro na query.\n";
        exit;
}

if (!$legendas = pg_query($conn, $sql)) {
        echo "Ocorreu um erro na query.\n";
        exit;
}

pg_close($conn);

?>

