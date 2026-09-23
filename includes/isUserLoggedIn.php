<?php
session_start();
//May I visit this page? Check the SESSION
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Redirect if not logged in
    header("location: login.php");
}
//Get name from the SESSION
$userName = $_SESSION['username'];
