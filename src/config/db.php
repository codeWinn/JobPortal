<?php
class db
{

    public function connect()
    {
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbname = "syscorp_cogent_api";

        //connect database using php pdo wrapper 
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    }
}
?>
