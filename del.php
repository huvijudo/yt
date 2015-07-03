<?php


$id = $_POST['id'];
$str_data = file_get_contents("data.json");
$str = json_decode($str_data,true);


error_reporting(0);

$check = 'Không có gì để xóa';

$newdata['youtube'] = array();
foreach ($str['youtube'] as $key => $value) {
	if($id != $value['id'])
	array_push($newdata['youtube'], $value);
}

$str_save = json_encode($newdata);
file_put_contents("data.json", $str_save);

$check = 'Xóa xong :3';


echo $check;

