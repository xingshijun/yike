<?php
	// phpinfo();
	// exit;
	header('Content-Type: application/json');
	
	// echo 'hello ajax';
	date_default_timezone_set('PRC'); 
	$step=$_GET['older'];
	$olderDay=date("Y-m-d",strtotime($step." day"));
	$step--;
	// 数据多数情况来自数据库
	// echo $olderDay;
	// 也可以来其它服务器的程序输出
	
	$data = file_get_contents('https://moment.douban.com/api/stream/date/'.$olderDay.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6');
	
	echo $data;





