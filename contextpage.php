<?php
session_start();

if ($_SESSION['logged_in']) {

$username = $_SESSION['username'];
}



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Context</title>
       <link rel="stylesheet" href="css/index.css" />
    <script src="js/index.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
    </style>
</head>
<body class='contextBody'>
<header>
    <div>
        <h1 class='contextH1'><?= $username ?>,</h1>
    </div>
</header>
<main>
    <div class='contextDiv'>
            <p>The year is 2044. Artificial Intelligence has gone rogue and has completely taken over 
                the world. Humanity is completely dependant on AI. You are simply another person trying to get to the end of the week
                and trying to make a living. You work for Winston Nuclear Powerplant. Try to stay afloat for one more week, if you can...
            </p>
            <a href="levels/level1/level1.php">Proceed</a>
</div>
</main>
<footer></footer>
</body>
</html>