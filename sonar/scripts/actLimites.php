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

$id = $_POST["id"];
$sup = $_POST["sup"];
$inf = $_POST["inf"];
$tipo = $_POST["tipo"];


//query to get data from the table
if($tipo == 1){
	$query = sprintf("UPDATE sensores SET limiteSuperior = '$sup' WHERE id = '$id';");
}
if($tipo == 2){
	$query = sprintf("UPDATE sensores SET limiteInferior = '$inf' WHERE id = '$id';");
}
if($tipo == 3){
	$query = sprintf("UPDATE sensores SET limiteSuperior = '$sup', limiteInferior = '$inf' WHERE id = '$id';");
}

//execute query
$result = $connection->conn->query($query);

//loop through the returned data


//free memory associated with result
//$result->close();

//close connection
$connection->conn->close();

//now print the data
print json_encode(2);
?>

