<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edu";

$con = mysqli_connect($servername, $username, $password, $dbname);

if(!$con){
    die("Could not connect to".mysqli_connect_error());
}


?>