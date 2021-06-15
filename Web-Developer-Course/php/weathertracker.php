<?php
	$error = "";
	$successMessage="";

	if($_GET['city']){

		$forecastPage = file_get_contents("http://completewebdevelopercourse.com/locations/London");
		echo $forecastPage;

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

    <title>Weather Tracker</title>
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
			<h1>What's the Weather? </h1>
			<h3>Enter the name of a city</h3>
		</div>

		<form>
			
			<div class="mb-3">
				<input type="text" name="city" class="form-control" id="city" placeholder="eg.London">
			</div>

			<button type="submit" id="submit" class="btn btn-primary">Submit</button>
		</form>

		<div id="error">
			<? echo $error?>
		</div>

	</div>

	
	
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

	<script type="text/javascript">
		$("form").submit(function (e){
			
			
		});		
	</script>

  </body>
</html>

