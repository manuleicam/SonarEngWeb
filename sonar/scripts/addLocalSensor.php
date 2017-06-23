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
$x = $_POST["x"];
$y = $_POST["y"];
$emEdificio = $_POST["emEdificio"];
$detalhes = $_POST["detalhes"];


//query to get data from the table
$query = sprintf("INSERT INTO localizacao (gpsX, gpsY, dentroEdificio, detalhes, sensor_id) VALUES ('$x','$y','$emEdificio','$detalhes', '$id');");

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

