<?php
session_start();
$login = false;
$errors = [];

// Is user logged in?
if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['logged_in'] === true) {
        $login = true;
    }
}

//validation

if (isset($_POST['submit'])) {
    require_once "includes/database.php";
    $user = mysqli_real_escape_string($db, $_POST['userName']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $banknumber = mysqli_real_escape_string($db, $_POST['banknumber']);
    //check if user already exists


    //

    $securePassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO `users`(`username`, `password`) VALUES ('$user','$securePassword')";
    mysqli_query($db, $query);
    header("location: login.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
   <nav></nav> 

   
    <h1>Register</h1>
   

   <form method="post">
        <input type="text" id="userName" name="userName" value="" required>
    <label for="userName"></label>

    <input type="text" id="password" name="password" value="" required>
    <label for="password"></label>

    <input type="text" id="banknumber" name="banknumber" value="" required>
    <label for="banknumber"></label>

    <input type="submit" name="submit">
   </form>

   <a href="login.php">Already have an account?</a>
</body>
</html>
</html>