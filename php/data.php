<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "erichigd_bullet";
$password = "eriQ2930";
$dbname = "erichigd_digitalBulletin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT content as myContent, name FROM bulletins WHERE Name='Test Bulletin'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
    $content = '{"name": "'.$row['name'].'","pages": '.$row['myContent'].'}';
} else {
    echo "0 results";
}
$conn->close();
$employees = json_decode($content, true);
			
echo json_encode($employees);
?>