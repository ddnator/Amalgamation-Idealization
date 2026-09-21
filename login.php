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
    $userName = mysqli_real_escape_string($db, $_POST['userName']);
    $givenPassword = mysqli_real_escape_string($db, $_POST['password']);

    //validation

    if(empty($errors)) {
        $query = "SELECT * FROM `users` WHERE `userName` = '$userName';";
        $result = mysqli_query($db, $query);
        $user = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if(empty($user)) {
            print_r('user does not exist');
            
        } else {
            $userPassword = $user[0]['password'];
            if(password_verify($givenPassword, $userPassword)) {;
                $_SESSION['user_email'] = $user[0]['username'];
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
   

   <form method="post">
        <input type="text" id="userName" name="userName" value='<?= htmlentities($userName ?? '')  ?>' required>
    <label for="userName">username</label>

    <input type="text" id="password" name="password" value="" required>
    <label for="password">password</label>

    <input type="submit" name="submit">
   </form>

   <a href="register.php">register</a>
</body>
</html>