<?php

	session_start();

	if (array_key_exists("content", $_POST)){

		$link = mysqli_connect("sdb-g.hosting.stackcp.net", "character_sheet-3138355db9", "cg3kwercis", "character_sheet-3138355db9");

		if(mysqli_connect_error()){
			die ("There was an error connecting to database");
		} 

		$content = $link->real_escape_string($_POST['content']);
		$id = $link->real_escape_string($_SESSION['id']);

		$query = "UPDATE users SET sheet = '$content' WHERE id = '$id' LIMIT 1";

		mysqli_query($link,$query);
		

	}


?>