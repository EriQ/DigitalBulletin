<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "erichigd_bullet";
$password = "eriQ2930";
$dbname = "erichigd_digitalBulletin";
$name = $_POST["name"];
$content = $_POST["content"];
/*// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// Prepared statement, stage 1: prepare
if (!($stmt = $mysqli->prepare("INSERT INTO bulletins(name, content) VALUES (?, ?)"))) {
    echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// Prepared statement, stage 2: bind and execute 
$id = 1;
if (!$stmt->bind_param("ss", $name, $content)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$conn->close();*/
echo "Bulletin Saved";
?>