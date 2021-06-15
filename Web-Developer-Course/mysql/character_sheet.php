<?php
	session_start();
	
	$error = "";

	if (array_key_exists("logout", $_GET)){
		unset($_SESSION);
		setcookie("id","",time() - 60*60);
		$_COOKIE["id"] = "";
	} else if ((array_key_exists("id", $_SESSION) AND $_SESSION['id']) OR (array_key_exists("id", $_COOKIE)) AND $_COOKIE['id']){
		
		header("Location: character_sheet_login.php");
	}

	if (array_key_exists("submit", $_POST)){
		
		$link = mysqli_connect("sdb-g.hosting.stackcp.net", "character_sheet-3138355db9", "cg3kwercis", "character_sheet-3138355db9");

		if(mysqli_connect_error()){
			die ("There was an error connecting to database");
		} 

		if(!$_POST['email']) {
			$error.= "An email address is required<br>";
		}

		if(!$_POST['password']) {
			$error.= "A password is required<br>";
		}

		if ($error != ""){
			$error = "<p>There were error(s) in your sign up:</p>".$error;
		} else{

			if ($_POST['sign_up'] == '1'){
				$query = "SELECT id FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
			
				$result = mysqli_query($link, $query);

				if(mysqli_num_rows($result) > 0) {
					$error = "That email is taken.";
				} else {

					$email = $link->real_escape_string($_POST['email']);
					$password = $link->real_escape_string($_POST['password']);
					$query = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

					if(!mysqli_query($link, $query)){
						$error = "<p>Could not sign you up</p>";
					} else{

						$hash = password_hash($password, PASSWORD_DEFAULT);
					
						$query = "UPDATE users SET password = '$hash' WHERE id = $link->insert_id LIMIT 1";

						mysqli_query($link, $query);

						$_SESSION['id'] = $link->insert_id;

						if($_POST['stay_logged'] == '1'){
							setcookie("id", $link->insert_id, time() + 60 * 60 * 24);
						}
					
						header("Location: character_sheet_login.php");
					}
				}
			} else {
				$email = $link->real_escape_string($_POST['email']);
				$password = $link->real_escape_string($_POST['password']);
				$query = "SELECT * FROM users WHERE email ='$email'";

				$result = mysqli_query($link, $query);

				$row = mysqli_fetch_array($result);

				if (isset($row)){
					//$hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

					//echo $hash;
					//echo '<br><br>';
					//echo $row['password'];

					if (password_verify($_POST['password'], $row['password'])){
						$_SESSION['id'] = $row['id'];

						if($_POST['stay_logged'] == '1'){
							setcookie("id", $row['id'], time() + 60 * 60 * 24);
						}
					
						header("Location: character_sheet_login.php");
					} else{
						$error = "The password or email is incorrect";
					}
				} else{
					$error = "The password or email is incorrect";
				}
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

    <title>Character sheet</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <style>
        .container {
            margin-top: 30vh;
            width: 30vw;
        }

        #login_form{
            display: none;
        }


    </style>
</head>
<body>

    <div class="container center toggle-form" id="signup_form">

        <div id="error"><?php if ($error!="") {
            echo '<div class="alert alert-danger" role="alert">'.$error.'</div>';
        }?>
        </div>

        <div class="text-center">
            <h1>Sign up System </h1>
            <h3>This it so sign up</h3>
        </div>

        <form method="post">

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="example@gmail.com">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password">
            </div>

            <div class="mb-3">
                <div class="form-check">
                    <label for="stay_logged" class="form-check-label">Stay logged in</label>
                    <input type="checkbox" name="stay_logged" class="form-check-input" id="stay_logged" value="1">
                </div>
            </div>

            <input type="hidden" name="sign_up" value="1">

            <div class="mb-3 text-center">
                <input type="submit" name="submit" value="Sign up!">
            </div>

        </form>

        <div class="text-center">
            <button class="switch_btn">Log in instead?</button>
        </div>
        

    </div>

    <div class="container center toggle-form" id="login_form">

        <div id="error"><?php if ($error!="") {
            echo '<div class="alert alert-danger" role="alert">'.$error.'</div>';
        }?>
        </div>

        <div class="text-center">
            <h1>Log in</h1>
            <h3>This is to log in</h3>
        </div>

        <form method="post">

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="text" name="email" class="form-control" id="email" placeholder="example@gmail.com">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password">
            </div>

            <div class="mb-3">
                <div class="form-check">
                    <label for="stay_logged" class="form-check-label">Stay logged in</label>
                    <input type="checkbox" name="stay_logged" class="form-check-input" id="stay_logged" value="1">
                </div>
            </div>

            <input type="hidden" name="sign_up" value="0">

            <div class="mb-3 text-center">
                <input type="submit" name="submit" value="Log in!">
            </div>


        </form>
        <div class="text-center">
            <button class="switch_btn">Sign up Instead?</button>
        </div>
    </div>



        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

        <script type="text/javascript">
            //$("form").submit(function (e){


            //});
            $(".switch_btn").click(function () {
                $(".toggle-form").toggle();
            });

        </script>

</body>
</html>