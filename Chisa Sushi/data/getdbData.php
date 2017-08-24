<?php
  $conn = mysql_connect("localhost","root","");
  $db = mysql_select_db("chisa",$conn);
  mysql_query("SET NAMES 'utf8'");

  $query = "SELECT * from menu";
  $result = mysql_query($query) or die(mysql_error());

  echo "<meta http-equiv='Content-type' content='text/html; charset=utf-8' />";
  echo "<script>console.log( 'loggggggg');</script>";
  echo "<table border='1px'>";
  while ($row = mysql_fetch_array($result)) {
    $id = $row[0];
    $nombre = $row[1];
    $des = $row[2];
    $r = $row[5];
    echo "<script>console.log( 'Debug Objects: " . $nombre . "' );</script>";
    echo "<tr>";
    echo "<td>{$id}</td>";
    echo "<td>{$nombre}</td>";
    echo "<td>{$des}</td>";
    echo "<td>{$r}</td>";
    echo "</tr>";
  }
  echo "</table>";
?>
