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


//query to get data from the table
$query = sprintf("SELECT v.valor, s.nome, s.limiteInferior as li, s.limiteSuperior as ls,date(v.dataLeitura) as dia, time(v.dataLeitura) as horas
from leituras as v inner join sensores as s on v.sensores_id = s.id
where (v.valor < s.limiteInferior OR v.valor > s.limiteSuperior) AND v.dataLeitura > DATE_SUB(NOW(),INTERVAL 2 DAY)
ORDER BY date(v.dataLeitura) DESC;");

//execute query
$result = $connection->conn->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$connection->conn->close();

//now print the data
print json_encode($data);
?>

