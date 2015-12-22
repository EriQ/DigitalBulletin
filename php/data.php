<?php

$servername = "localhost";
$username = "erichigd_bullet";
$password = "eriQ2930";
$dbname = "erichigd_digitalBulletin";
$id = $_GET["id"];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT content as myContent, name FROM bulletins WHERE ID = ".$id;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
    $content = '{"name": "'.$row['name'].'","pages": '.$row['myContent'].'}';
} else {
    echo "0 results";
}
$conn->close();
$employees = json_decode($content, true);
	//print_r($employees);		
echo json_encode($employees);
?>