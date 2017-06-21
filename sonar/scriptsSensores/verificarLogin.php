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


$query = sprintf("SELECT count(*) as t, id, nome, password FROM sensores WHERE nome = '$nome';");

//execute query

$result = $connection->conn->query($query);

//loop through the returned database
$data = array();

foreach ($result as $row) {
	$data[] = $row;
}

if($row['t'] == 1){
	if($password == $row['password']) {
	print json_encode($row['id']);
	$connection->conn->close();
	}
	else{
		echo(-1);
		$connection->conn->close();
	}
}
else {
	echo(0);
	$connection->conn->close();
}

//close connection


//now print the data
//echo($data);
?>

