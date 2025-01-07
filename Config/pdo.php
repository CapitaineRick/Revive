<?php 
$host = "localhost";
$username = "root";
$password = "";
$dbname = "ape_data";


$options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password,$options);

} catch (PDOException $error){
    die("erreur : " . $error->getMessage());

}

?>