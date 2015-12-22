<?php

$servername = "localhost";
$username = "erichigd_bullet";
$password = "eriQ2930";
$dbname = "erichigd_digitalBulletin";
$id = $_GET["id"];
$bulletins = [];
// Create connection
mysql_connect($servername, $username, $password) or
    die("Could not connect: " . mysql_error());
mysql_select_db($dbname);

$result = mysql_query("SELECT ID, name, template FROM bulletins WHERE organization_id = ".$id);

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    array_push($bulletins, $row);
}
mysql_free_result($result);		
$rows = array("count"=>count($bulletins), "bulletins"=>$bulletins);
echo json_encode($rows);
?>