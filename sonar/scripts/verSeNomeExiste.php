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
	die("Connection failed: " . $connection->conn->error);
}

$nome = $_POST["nome"];
$password = $_POST["password"];


//query to get data from the table
$query = sprintf("SELECT count(*) as nuser, password from sensores WHERE nome = '$nome';");

//execute query
$result = $connection->conn->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

if ($row['nuser'] == 0){
	$query = sprintf("INSERT INTO sensores (nome, password, datacriacao, limiteInferior, limiteSuperior) VALUES ('$nome', '$password', NOW(), 0,0);");
	$result = $connection->conn->query($query);
	print json_encode(2);
}
else print json_encode(1);

//close connection
$connection->conn->close();

//now print the data

?>

