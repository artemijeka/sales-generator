<?php

if ($_POST['from'] === 'CP@()(@YCB@HDFCB)@(tb(RRGCB&^389b') {

  $message = "<p>";
  $message .= "Email: " . $_POST[0];
  $message .= "<br>Телефон: " . $_POST[1];
  $message .= "</p>";

  $headers  = "From: web@master-artem.ru" . "\r\n";
  $headers .= "Reply-To: web@master-artem.ru" . "\r\n";
  $headers .= "CC: web@master-artem.ru\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  $subject = $_POST[2];

  if (@mail("artem.kuznecov.samara@yandex.ru", $subject, $message, $headers)) {
    echo 'sended';
  } else {
    echo 'error';
  }
} else {
  echo 'error';
}
