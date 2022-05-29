<?php
$from = $_POST['Email'];

$to = 'infobuilu@gmail.com';
$subject = 'Testing sendmail.exe';
$message = 'Hi, you just received an email using sendmail!';
$header = $from."\r\n".
            'MIME-Version: 1.0'. "\r\n" .
            'Content-type: text/html; charset=utf-8';
if(mail($to, $subject, $message, $header))
    echo 'Dear, Mr./s'.$from." Email sent";
else
    echo "Email sending failed!";
	echo "<br/>".$from." try again";
?>
