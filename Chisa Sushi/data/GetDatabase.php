<?php

$_POST['method']();

  function getDB() {
    if (isset($_POST['id'])) {
      $id = json_decode($_POST['id']);
    }

    $databaseNames = array();

    $conn = mysql_connect("localhost","root","");
    $db = mysql_select_db("chisa",$conn);
    mysql_query("SET NAMES 'utf8'");

    $query = "SELECT * from menu WHERE id = '194' OR id = '195'";
    $result = mysql_query($query) or die(mysql_error());
    while ($row = mysql_fetch_row($result)) {
      $id = $row[0];
      $nombre = $row[1];
      $des = $row[2];
      $r = $row[5];
      $return = new stdClass;
      $return = array('id' =>$id, 'nombre' =>$nombre, 'des' =>$des, 'r' =>$r);
      array_push($databaseNames, $return);
    }
    /*if ($result) {
      while ($row = $result->fetch_array()) {
        array_push($databaseNames, $row[0]);
      }
    }*/

    //$return = new stdClass;
    //$return->succsess = true;
    //$return->errorMessage = "";
    //$return->$id['database_names'] = $databaseNames;
    $json = json_encode($databaseNames);
    //$json = json_encode($return);

    echo $json;
  }
 ?>
