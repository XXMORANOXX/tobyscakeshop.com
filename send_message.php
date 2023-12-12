<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $number = $_POST["number"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

   
    $to = "chiquitohazam6@gmail.com";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);

    header("Location: thank_you_contact.php");
    exit();
}
?>
