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

mysqli_set_charset($connection->conn, "utf8");


$query = sprintf("SELECT count(*) as id, nome FROM sensores WHERE nome = '$nome';");

//execute query

$result = $connection->conn->query($query);

//loop through the returned data
$data = array();


foreach ($result as $row) {
	$data[] = $row;
}



//close connection
$connection->conn->close();

//now print the data
//echo($data);
print json_encode($row["id"],JSON_UNESCAPED_UNICODE);
?>

