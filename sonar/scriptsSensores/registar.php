<?php
//setting header to json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
//database
require_once(dirname(__FILE__).'/connection.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){
	echo(1);
}

$nome = $_GET["nome"];
$password = $_GET["password"];

mysqli_set_charset($connection->conn, "utf8");


$query = sprintf("INSERT INTO sensores (nome, password, datacriacao) VALUES ('$nome', '$password', NOW());");

//execute query

$result = $connection->conn->query($query);

//loop through the returned data
$data = array();



//close connection
$connection->conn->close();

//now print the data
//echo("Inserido com sucesso");
print json_encode("wow",JSON_UNESCAPED_UNICODE);
?>

