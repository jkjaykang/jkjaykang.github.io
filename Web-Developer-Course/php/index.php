<?php


	$error = "";
	$successMessage="";

	if($_POST){
		if(!$_POST["InputEmail"]){
			$error .= "An email address is required.<br>";
		}
		if(!$_POST["content"]){
			$error .= "A content is required.<br>";
		}
		if(!$_POST["InputSubject"]){
			$error .= "A subject is required.<br>";
		}
		if ($_POST['email'] && !filter_var($_POST["InputEmail"], FILTER_VALIDATE_EMAIL)) {
			$error .= "An email address is invalid.<br>";
		}

		if ($error != ""){
			$error = '<div class="alert alert-danger" role="alert"> <strong>There were error(s) in your form</strong><br>' . $error . '</div>';
		} else{
			$emailTo = "tom@edd.com";
			$subject = $_POST['InputSubject'];
			$subject = $_POST['content'];
			$headers = "From: ".$_POST['InputEmail'];

			if(mail($emailTo, $subject, $content, $headers)){
				$successMessage = '<div class="alert alert-success" role="alert"> Your message sent </div>';

			} else{
				$error = '<div class="alert alert-danger" role="alert"> Message could not be sent </div>';

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

    <title>Hello, world!</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>
  <body>
  
	<div class="container mt-5">
		<div id="error">
			<? echo $error.$successMessage; ?>
		</div>
		<form method="post">
			<div class="mb-3">
				<label for="InputEmail" class="form-label">Email address</label>
				<input type="email" name="InputEmail" class="form-control" id="InputEmail" aria-describedby="emailHelp">
				<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
			</div>

			<div class="mb-3">
				<label for="InputSubject" class="form-label">Subject</label>
				<input type="text" name="InputSubject" class="form-control" id="InputSubject">
			</div>
			
			<div class="mb-3">
				<label for="content">What would you like to ask us?</label>
				<textarea name="content" class="form-control" id="content" rows="3"></textarea>
			</div>
			
			<button type="submit" id="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>

	
	
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

	<script type="text/javascript">
		$("form").submit(function (e){
			

			var error = "";

			if($("#InputEmail").val() == ""){
				error += "The email field is empty<br>"
			}
			if($("#InputSubject").val() == ""){
				error += "Subject field is empty<br>"
			}
			if($("#content").val() == ""){
				error += "Content field is empty"
			}

			if (error != ""){
				$("#error").html('<div class="alert alert-danger" role="alert"> <strong>There were error(s) in your form</strong><br>' + error + '</div>');
				return false;
			} else{
				return true;
			}
			
		});		
	</script>

  </body>
</html>