<?php
// // Read the file contents into a string variable,
// // and parse the string into a data structure
// $str_data = file_get_contents("data.json");
// $data = json_decode($str_data,true);
 
// echo $data["youtube"]["id"][0];
 
// // Modify the value, and write the structure to a file "data_out.json"
// $data["youtube"]["id"][0]='demo demo';
 
// $fh = fopen("data.json", 'w') 
// 	or die("Error opening output file");
// fwrite($fh, json_encode($data,JSON_UNESCAPED_UNICODE));
// fclose($fh);


$data = $_POST['id'];
$str_data = file_get_contents("data.json");
$str = json_decode($str_data);
//print_r($str_data);
//echo '<br>';
//print_r($str);
//echo '<br><br><br>';
//print_r($str->youtube[0]->id);
//echo '<br><br><br>';

//echo count($str->youtube);
error_reporting(0);
$check = 'Không có gì để xóa';
foreach($str->youtube as $k => $tmp){
	if($data == $tmp->id){
		unset($str->youtube[$k]);
		$str_save = json_encode($str);
		file_put_contents("data.json", $str_save);

		$check = 'Xóa xong :3';
		break;
	}
}
echo $check;

//$file = "data.json";
//echo $data;
// $str_data = file_get_contents($file);
// $tempArray = json_decode($str_data);
// return $tempArray;
// array_push($tempArray, $data);
// $jsonData = json_encode($tempArray);
// file_put_contents($file, $jsonData);
