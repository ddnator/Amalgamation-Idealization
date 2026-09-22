<?php
session_start();
$login = false;
$errors = [];

// Is user logged in?
if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['logged_in'] === true) {
        $login = true;
        header("location: login.php");
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
            $errors['username'] = 'Username is already in use, please try another name';
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
    <link rel="stylesheet" href="css/login.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
<body>
   <nav></nav> 

   
    <h1>Register</h1>
   
    <main>
   <form method="post">
    <label for="username">Username:</label>
        <input type="text" id="username" name="username" value="<?= htmlentities($username ?? '' )?>" required>
        <p>
            <?= $errors['username'] ?? '' ?>
        </p>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <p>
            <?= $errors['password'] ?? '' ?>
        </p>

        <label for="banknumber">Banknumber:</label>
        <input type="text" id="banknumber" name="banknumber" value="<?= htmlentities($banknumber ?? '' )?>" required>
        <p>
            <?= $errors['banknumber'] ?? '' ?>
        </p>

        <div class=submitRegisterDiv>
        <input type="submit" name="submit">
        <a href="login.php">Already have an account?</a>
        </div>
   </form>
   </main>
</body>
</html>
</html>