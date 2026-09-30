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

    header("location: index.php");
    exit;
}


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="minigame4.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
    <script src="minigame4.js" defer charset="utf-8"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <title>Reactor 04</title>
</head>
<body>
<header>
    <div>
        <h1>Reactor 04</h1>
        <p>Core memory training</p>
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
    <h1 id="level-title">Memory training</h1>
    <div class="container">
        <div class="row">

            <div type="button" id="green" class="btn green">

            </div>

            <div type="button" id="red" class="btn red">

            </div>
        </div>

        <div class="row">

            <div type="button" id="yellow" class="btn yellow">

            </div>
            <div type="button" id="blue" class="btn blue">

            </div>

        </div>
    </div>
    <button class="start-button">Start Training</button>
</main>
<dialog>
    <button class="close">X</button>
    <div id="dialog-content">

    </div>
</dialog>
<footer>
    <div id="work-info">
        <div>
            <p>Working...</p>
        </div>
        <div id="money-made">
            <p>$<?php echo $user['money'] ?></p>
        </div>
    </div>
    <div class="work-bar" role="progressbar" aria-label="work-value" aria-valuenow="95" aria-valuemin="0"
         aria-valuemax="100">
        <div class="work-fill" style="width: 95%"></div>
    </div>
</footer>

</body>
</html>
