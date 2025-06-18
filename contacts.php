<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST['message'] ?? ''));
    
    // Validate data
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Please fill out all fields correctly.']);
        exit;
    }
    
    // Set recipient email (CHANGE THIS TO YOUR EMAIL)
    $recipient = "your-email@example.com";
    $subject = "New contact from $name";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>";
    
    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(['message' => 'Thank you! Your message has been sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Oops! Something went wrong and we couldn\'t send your message.']);
    }
} else {
    http_response_code(403);
    echo json_encode(['message' => 'There was a problem with your submission, please try again.']);
}
?>