<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "erichigd_bullet";
$password = "eriQ2930";
$dbname = "erichigd_digitalBulletin";
$return = "Bulletin Saved";
$name = $_POST["name"];
$content = $_POST["content"];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	$return="Connection failed: " . $conn->connect_error;
} 
// Prepared statement, stage 1: prepare
if (!($stmt = $conn->prepare("INSERT INTO bulletins(name, content) VALUES (?, ?)"))) {
    $return = "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
// Prepared statement, stage 2: bind and execute 
$id = 1;
if (!$stmt->bind_param("ss", $name, $content)) {
    $return = "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    $return = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$conn->close();
echo $return;
?>