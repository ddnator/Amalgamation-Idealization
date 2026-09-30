<?php
  require_once "includes/isUserLoggedIn.php";
if ($_SESSION['logged_in'] && $_SESSION['username']) {
   $username = $_SESSION['username'];
  
  }
  
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/index.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
    </style>
    <title>Home</title>
</head>

<body>
    <nav>
                <div class="visionControl">
                        <a href="" class="ourVision">Our vision</a>
                        <p class="visionText" hidden>AI is becoming more and more prominent in our society, but not all AI is desirable. Our game is made to highlight a future we may have when AI keeps advancing like it has in order to spread awareness. This is a work of fiction.</p>
                </div>
        <div class="profile">
            <img class='profileImg' src="images/profile.png" alt="Photo of the anonymous profile of the user">
            <p><?= htmlspecialchars($username, ENT_QUOTES, 'UTF-8') ?></p>
        </div>
        <a href="logout.php">Log out</a>
    </nav>
    <header id="homeHeader">
        <h1 class="gradient">Amalgamation Idealization</h1>
        <p>A world where humanity got replaced</p>
    </header>
    <main>
        <div class="MainContent">
            <a href="contextpage.php">Start Game</a>
            <a href="" id="endGameButton">End Game</a>
        </div>
    </main>
    <footer>
        <p>CMGT TLE1 2026 ©</p>
        <p>All rights reserved</p>
    </footer>
</body>

</html>