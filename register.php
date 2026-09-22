<?php
session_start();
$login = false;
$errors = [];

// Is user logged in?
if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['logged_in'] === true) {
        $login = true;
        header("location: index.php");
    }
}

if (isset($_POST['submit'])) {
    require_once "includes/database.php";
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $banknumber = mysqli_real_escape_string($db, $_POST['banknumber']);
    //
    if ($username === '') {
        $errors['username'] = 'No username has been entered';
    } else {
        if (strlen($username) > 30) {
            $errors['username'] = 'Username is too long';
        }
    }

    if ($password === '') {
        $errors['password'] = 'No password has been entered';
    } else {
        if (strlen($password) > 30 || strlen($password) < 8) {
            $errors['password'] = 'Please select a password length between 8 and 30 characters';
        } 
    }

    if ($banknumber === '') {
        $errors['banknumber'] = 'No banknumber has been entered';
    } else {
        if (strlen($banknumber) > 34) {
            $errors['banknumber'] = 'Maximum size of a banknumber can only be 34';
        } else if (strlen($banknumber) < 4) {
            $errors['banknumber'] = 'Banknumber too small';
        }
    }

    if (empty($errors)){
    //check if user already exists
        $query = "SELECT * FROM `users` WHERE `username` = '$username';";
        $result = mysqli_query($db, $query);
        $user = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if(!empty($user)) {
            
        } else {
            $securePassword = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO `users`(`banknumber`, `password`, `username`) VALUES ('$banknumber','$securePassword', '$username')";
            mysqli_query($db, $query);
            header("location: login.php");
        }
    }
    //
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
        <input type="text" id="username" name="username" value="<?= htmlentities($username ?? '' )?>" required>
        <label for="username"></label>
        <p class="help is-danger">
            <?= $errors['username'] ?? '' ?>
        </p>

        <input type="text" id="password" name="password" value="<?= htmlentities($password ?? '' )?>" required>
        <label for="password"></label>
        <p class="help is-danger">
            <?= $errors['password'] ?? '' ?>
        </p>

        <input type="text" id="banknumber" name="banknumber" value="<?= htmlentities($banknumber ?? '' )?>" required>
        <label for="banknumber"></label>
        <p class="help is-danger">
            <?= $errors['banknumber'] ?? '' ?>
        </p>

        <input type="submit" name="submit">
   </form>

   <a href="login.php">Already have an account?</a>
</body>
</html>
</html>