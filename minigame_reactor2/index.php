<?php
require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . "/../includes/isUserLoggedIn.php";
if ($_SESSION['logged_in'] && $_SESSION['username']) {
    $username = $_SESSION['username'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $earned = (int)($_POST['earned'] ?? 0);

    $stmt = mysqli_prepare($db, 'UPDATE users SET money = money + ? WHERE username = ?');
    mysqli_stmt_bind_param($stmt, 'is', $earned, $username);
    mysqli_stmt_execute($stmt);

    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
    exit;
}

$stmt = mysqli_prepare($db, 'SELECT money FROM users WHERE username = ?');
mysqli_stmt_bind_param($stmt, 's', $username);
mysqli_stmt_execute($stmt);
$user = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

if (!isset($_SESSION["points"])) {
    $_SESSION["points"] = 0;
}

if (isset($_GET["points"])) {
    $_SESSION["points"] += (int)$_GET["points"];

    if ($_SESSION["points"] >= 100) {
        $_SESSION["points"] = 0;
        header("location: ../Levels/level5/level5.php?reactorComplete=1&points=100");
    } else {
    header("location: index.php");
    exit;
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <link href="style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
    <script defer src="game.js" type="text/javascript"></script>

    <title>Minigame</title>
</head>


<body>
<header>
    <div>
        <h1>Reactor 02</h1>
        <p>Minigame: Number game</p>
    </div>

    <div id="point-amount">
        <p id="point">Points: <?php echo $_SESSION["points"]; ?></p>
    </div>

    <div id="date-time">
        <p id="date"></p>
        <p id="time"></p>
    </div>
</header>

<main>
    <div class="image-container">
        <img alt="System Image" src="images/system.png">
    </div>
<div class="game-container">
    <p>Next number: <span id="nextNumber">1</span></p>

    <div id="gameBoard"></div>
    <button id="restartButton">Restart</button>
</div>

</main>
<footer>
    <div id="work-info">
        <div>
            <p>Working...</p>
        </div>
        <div id="money-made">
            <p>$<?php echo $user['money'] ?></p>
        </div>
    </div>
    <div aria-label="work-value" aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" class="work-bar"
         role="progressbar">
        <div class="work-fill" style="width: 10%"></div>
    </div>
</footer>

</body>
</html>