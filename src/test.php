<?php 
$emailTo = 'hallo@praxkit.ch';
$email = 'andreas@kapp.ch';
$name = 'Andreas';
$siteTitle = 'PraxKit';
$subject = 'Feedback '.$siteTitle.' from '.$name;
$comments = 'hallo comment';
$body = "Name: $name \n\nEmail: $email \n\nMessage: $comments";
$headers = 'From: ' .' <'.$email.'>' . "\r\n" . 'Reply-To: ' . $email;

mail($emailTo, $subject, $body, $headers);
		
?>