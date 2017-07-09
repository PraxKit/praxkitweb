<?php 
$emailTo = 'hallo@praxkit.ch';
$siteTitle = 'PraxKit';
$redirect_page = 'https://www.praxkit.ch/index.html';

error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

/*
echo "<table>";

    foreach ($_POST as $key => $value) {
        echo "<tr>";
        echo "<td>";
        echo $key;
        echo "</td>";
        echo "<td>";
        echo $value;
        echo "</td>";
        echo "</tr>";
    } 
echo "</table>";
*/

//If the form is submitted
if(isset($_POST['submitted'])) {
	
	// require a name from user
	if(trim($_POST['name']) === '') {
		$nameError =  'Forgot your name!'; 
		$hasError = true;
	} else {
		$name = trim($_POST['name']);
	}
	
	// need valid email
	if(trim($_POST['_replyto']) === '')  {
		$emailError = 'Forgot to enter in your e-mail address.';
		$hasError = true;
	} else if (!preg_match("/^[[:alnum:]][a-z0-9_.-]*@[a-z0-9.-]+\.[a-z]{2,4}$/i", trim($_POST['_replyto']))) {
		$emailError = 'You entered an invalid email address.';
		$hasError = true;
	} else {
		$email = trim($_POST['_replyto']);
	}

	// require a phone from user
	if(trim($_POST['phone']) === '') {
		$nameError =  'Forgot your naphone	me!'; 
		$hasError = true;
	} else {
		$phone = trim($_POST['phone']);
	}
	
		
	// we need at least some content
	if(trim($_POST['message']) === '') {
		$commentError = 'You forgot to enter a message!';
		$hasError = true;
	} else {
		if(function_exists('stripslashes')) {
			$comments = stripslashes(trim($_POST['message']));
		} else {
			$comments = trim($_POST['message']);
		}
	}

	// redirect to website
	if(trim($_POST['_next']) === '') {
		$redirect = $redirect_page;
	} else {
		$redirect = trim($_POST['_next']);
	}

		
	// upon no failure errors let's email now!
	if(!isset($hasError)) {
		
		$subject = 'Feedback '.$siteTitle.' from '.$name;
		$body = "Name: $name \n\nEmail: $email \n\n Telefon: $phone \n\nNachricht:\n\n $comments";
		$headers = 'From: ' .' <'.$email.'>' . "\r\n" . 'Reply-To: ' . $email;

		mail($emailTo, $subject, $body, $headers);
		
        //Autorespond
		//$respondSubject = 'Thank you for contacting '.$siteTitle;
		//$respondBody = "Your message to $siteTitle has been delivered! \n\nWe will answer back as soon as possible.";
		//$respondHeaders = 'From: ' .' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $emailTo;
		
		//mail($email, $respondSubject, $respondBody, $respondHeaders);
		
        // set our boolean completion value to TRUE
		$emailSent = true;
	}

	header("Location: $redirect"); /* Redirect browser */
	exit();
}
?>