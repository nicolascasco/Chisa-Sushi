<?php


//sql query needs sanitation
  $_POST['method']();

  function productInfo() {
    if (isset($_POST['id'])) {
      $id = json_decode($_POST['id']);
    }

    $conn = mysql_connect("localhost", "root", "");
    $db = mysql_select_db("Chisa", $conn);
    mysql_query("SET NAMES 'utf8'");

    $query = "SELECT * FROM menu WHERE id = '$id'";
    $result = mysql_query($query) or die(mysql_error());
    $row = mysql_fetch_row($result);

    $return = new stdClass;
    $return = array('id'=>$row[0], 'nombre'=>$row[1], 'des'=>$row[2], 'img'=>$row[3], 'url'=>$row[4], 'target'=>$row[5]);

    $json = json_encode($return);
    echo $json;
  }
?>
