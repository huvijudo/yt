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


$id = $_POST['videoid'];
$category = $_POST['videocategory'];
//$data = $_POST['videoid'];
//$data = 'conga';
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
$check = 0;
foreach($str->youtube as $tmp){
	if($id == $tmp->id){
		$check = 1; break;
	}
}
if($check == 1){
	$databa = 'Id này đã có';
}else{
	//$str->youtube[count($str->youtube)]->id = $id;
	$newdata = array('id'=>$id,'category'=>$category);
	//$str->youtube[count($str->youtube)]->category = $category;
	//echo '<br><br><br>';
	$str->youtube[] = $newdata;
	//print_r($str);
	$str_save = json_encode($str);
	//echo '<br><br><br>';
	//print_r($str_save);
	
	file_put_contents("data.json", $str_save);
	$databa = 'Lưu hành công';

}

echo $databa;

//$file = "data.json";
//echo $data;
// $str_data = file_get_contents($file);
// $tempArray = json_decode($str_data);
// return $tempArray;
// array_push($tempArray, $data);
// $jsonData = json_encode($tempArray);
// file_put_contents($file, $jsonData);
