<?php
	
	//setcookie("customerID", "1234", time() + 60*60*24);

	//delete a cookie
	//setcookie("customerID", "", time() - 60*60);
	echo $_COOKIE["customerID"];

	echo "<br><br>";

	session_start();

	$hash = password_hash("mypassword", PASSWORD_DEFAULT);

	echo $hash;

	echo "<br><br>";

	if (password_verify('mypa2ssword', $hash)){
		echo 'Password is valid';
	}else{
		echo 'Password is invalid';
	}


	$link = mysqli_connect("sdb-g.hosting.stackcp.net", "usernames-3138354bfc", "9d52dhdlij", "usernames-3138354bfc");

	if(mysqli_connect_error()){
		die ("There was an error connecting to database");
	} 

	//$query = "INSERT INTO users (email,password) 
	//		  VALUES('johnny@gmail.com', '1231ccdc')";

	//$query = "UPDATE users SET email = 'hello123@gmail.com' WHERE id = 1 LIMIT 1";
	//$query = "UPDATE users SET password = '888dddd' WHERE email = 'hello123@gmail.com' LIMIT 1";

	//if(mysqli_query($link, $query)){
	//	echo "Query inserted succesfully";
	//}else{
	//	echo "Query not inserted succesfully";
	//}

	$name = "Jay Kang";

	//$query = "SELECT * FROM users WHERE email LIKE '%gmail.com' AND password LIKE '%d%'";
	//$query = "SELECT * From users WHERE name = '".mysqli_real_escape_string($link,$name)."'";
	//if ($result = mysqli_query($link, $query)){

	//	while ($row = mysqli_fetch_array($result)){
	//		print_r($row);
	//	}
	//}

	if (array_key_exists('email', $_POST) OR array_key_exists('password', $_POST)){
		$email = $_POST['email'];
		$password = $_POST['password'];
		$query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."'";
		$result = mysqli_query($link, $query);
		if(mysqli_num_rows($result) > 0){
			echo "That email already exists";
		} else{
			$query = "INSERT INTO users (name, email, password)
					  VALUES('Hector',
							 '".mysqli_real_escape_string($link, $email)."',
							 '".mysqli_real_escape_string($link, $password)."')";
			if(mysqli_query($link, $query)){
				$_SESSION['email'] = $_POST['email'];
				//echo "goodbye!";
				header("Location: session.php");
			}else{
				echo "Query not inserted succesfully";
			}
			
		}
	}

?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

    <title>Sign up MYSQL</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<style>
		.container{
			margin-top: 200px;
			width: 500px;
		}
	</style>
  </head>
  <body>
  
	<div class="container text-center center">
		

		<div>
			<h1>Sign up </h1>
		</div>

		<form method="post">
			
			<div class="mb-3">
				<input type="text" name="email" class="form-control" id="email" placeholder="someone@gmail.com">
			</div>
			<div class="mb-3">
				<input type="password" name="password" class="form-control" id="password">
			</div>

			<button type="submit" id="submit" class="btn btn-primary">Submit</button>
		</form>

		<div id="error">

		</div>

	</div>

	
	
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

	<script type="text/javascript">	
	</script>

  </body>
</html>