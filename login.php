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
if(isset($_POST['submit'])) {
    require_once "includes/database.php";
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $givenPassword = mysqli_real_escape_string($db, $_POST['password']);

    //validation
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

    if(empty($errors)) {
        $query = "SELECT * FROM `users` WHERE `username` = '$username';";
        $result = mysqli_query($db, $query);
        $user = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if(empty($user)) {
            print_r('user does not exist');
            
        } else {
            $userPassword = $user[0]['password'];
            if(password_verify($givenPassword, $userPassword)) {;
                $_SESSION['username'] = $user[0]['username'];
                $_SESSION['logged_in'] = true;
                header("location: index.php");
                exit;
            } else {
                print_r('incorectefa');
            }
        }
    }
} 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
</head>
<body>
   <nav></nav> 

   
    <h1>Login</h1>
   
    <?php if (!$login) { ?>
   <form method="post">
        <label for="username">username</label>
        <input type="text" id="username" name="username" value='<?= htmlentities($username ?? '')  ?>' required>

        <label for="password">password</label>
        <input type="password" id="password" name="password" value="" required>

        <input type="submit" name="submit">
   </form>
   <a href="register.php">register</a>
    <?php } else { ?>
        <p>You are already logged in!</p>
        <p><a href="logout.php">Log out</a> / <a href="index.php">To home page</a></p>
    <?php } ?>
</body>
</html>