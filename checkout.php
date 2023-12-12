<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];
    $country = $_POST["country"];
    $city = $_POST["city"];

    // Process the data or store it in a database

    // Redirect to a thank-you page or perform other actions
    header("Location: thank_you.php");
    exit();
}
?>
