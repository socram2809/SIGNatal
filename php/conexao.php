<?php

/* 
 * UFRN - Universidade Federal do Rio Grande do Norte
 * Desenvolvedor: Marcos Aurélio Macedo da Rocha Júnior
 * Curso: Engenharia da Computação
 */
ini_set('display_errors', 1); 

//Informação de login no banco
$host = 'localhost';
$port = '5432';
$dbname = 'multifinalitario';
$user = 'postgres';
$password = 'senha';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
	echo "Não conectado : " . pg_error();
	exit;
}


?>
