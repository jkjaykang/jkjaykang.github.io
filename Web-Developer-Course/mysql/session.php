<?php
	session_start();

	//$_SESSION['username'] = "jkjaykang";

	//echo $_SESSION['username'];

	//$link = mysqli_connect("sdb-g.hosting.stackcp.net", "usernames-3138354bfc", "9d52dhdlij", "usernames-3138354bfc");

	//if(mysqli_connect_error()){
	//	die ("There was an error connecting to database");
	//} 

	//$query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_SESSION['email'])."'";

	//$result = mysqli_query($link, $query);
	if($_SESSION['email']){
		echo "You are logged in";
	} else{
		header("Location: index.php");
			
	}
?>