<?php
ini_set('display_errors', 'On');


// echo '<pre>';
// var_dump($_GET['code']);
// echo '</pre>';



define('TOKEN_FILE', './file.json');
$clientId = 'f467f7b7-22f0-4305-86f0-31455e5b4eef';
$clientSecret = 'noGU0flb1e2h0RY8MQWToIquG7TATsY7qN4rbVPWmrHOK8y3L1HF8fQWABAPKaDS';
$redirectUri = 'https://web.master-artem.ru/projects/tests/sales-generator/amocrm/index.php';
// $codeAuth = 'def50200ba8bd4dd5d9af08e44b220769a024671199980ec32fdb4ead12da2cfa183a2a283f96a5f402791cc09f8d96feb5da894970dc9ee2adcf3acba54ccb7f14dde7a64517a68726105e52ccce924b5d1bce9a26eafa7a261085b69b7cb31a9b2d2bfcb42e42ba7586f0810d6412339fcb6fc53bf5eab1ac53003b586e442a0de80a5769e3156b2c58e0ac69d3725cb012575362072d6b2c365e7488d344c50e8e5326c25ec0f098e7e0dedbeef4d199fb4a39c329b958cee2b3a71091e1546a2d6c5bdb16a5ae740b2469376bff49a7fa5228a8e048a24676e37b79d6580440f4f2a500dc01d09274ce3b53711e0b0a1c05f53ca306fe6d381c5c31c3990264dffdf51e84bcbd2441aa6c63626d042e63e8eabca71cb4aee6d8556c709911325f09188b8519c9c1c728c0f633d26d45c506c8e07799068cefefc085897c49c328450a0abc2adb20fecc34b836362110bd9b15ea06abd6ab5fde9847ec8fa4969667cc55354043805c0e1884c2fb7b83e8ed76ace7f7563c0ad4611df4c3480b6aae8b27d28fcffaf591d083496316f183f4b6d95e161ed411370bd80f069399ec50944a285de9977889c805814f1a2b4d4130c00a40c5693ef0fb502ac6edd9f6096441a805643cef53719f0e6345a057dfc3b073cb8007842427091cff04118af2cd2277d1ff076bd2229789164413d80268723aeac4cbeb95d31155c3269c0f66b83e6670ede14fa6dfad8ecb487';

// $clientId = $_ENV['CLIENT_ID'];
// $clientSecret = $_ENV['CLIENT_SECRET'];
// $redirectUri = $_ENV['CLIENT_REDIRECT_URI'];


require_once './vendor/autoload.php';

$apiClient = new \AmoCRM\Client\AmoCRMApiClient($clientId, $clientSecret, $redirectUri);



// use AmoCRM\OAuth2\Client\Provider\AmoCRM;
// include_once __DIR__ . '/src/AmoCRM.php';
include_once __DIR__ . '/bootstrap.php';

session_start();

if (isset($_GET['referer'])) {
  $apiClient->setAccountBaseDomain($_GET['referer']);
}

if (!isset($_GET['code'])) {
  $state = bin2hex(random_bytes(16));
  $_SESSION['oauth2state'] = $state;
  if (isset($_GET['button'])) {
    echo $apiClient->getOAuthClient()->getOAuthButton(
      [
        'title' => 'Установить интеграцию',
        'compact' => true,
        'class_name' => 'className',
        'color' => 'default',
        'error_callback' => 'handleOauthError',
        'state' => $state,
      ]
    );
    die;
  } else {
    $authorizationUrl = $apiClient->getOAuthClient()->getAuthorizeUrl([
      'state' => $state,
      'mode' => 'post_message',
    ]);
    header('Location: ' . $authorizationUrl);
    die;
  }
} 
// elseif (empty($_GET['state']) || empty($_SESSION['oauth2state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
//   unset($_SESSION['oauth2state']);
//   exit('Invalid state');
// }

/**
 * Ловим обратный код
 */
try {
  $accessToken = $apiClient->getOAuthClient()->getAccessTokenByCode($_GET['code']);

  if (!$accessToken->hasExpired()) {
    saveToken([
      'accessToken' => $accessToken->getToken(),
      'refreshToken' => $accessToken->getRefreshToken(),
      'expires' => $accessToken->getExpires(),
      'baseDomain' => $apiClient->getAccountBaseDomain(),
    ]);
  }
} catch (Exception $e) {
  die((string)$e);
}

$ownerDetails = $apiClient->getOAuthClient()->getResourceOwner($accessToken);

printf('Hello, %s!', $ownerDetails->getName());



function saveToken($accessToken)
{
  if (
    isset($accessToken)
    && isset($accessToken['accessToken'])
    && isset($accessToken['refreshToken'])
    && isset($accessToken['expires'])
    && isset($accessToken['baseDomain'])
  ) {
    $data = [
      'accessToken' => $accessToken['accessToken'],
      'expires' => $accessToken['expires'],
      'refreshToken' => $accessToken['refreshToken'],
      'baseDomain' => $accessToken['baseDomain'],
    ];

    file_put_contents(TOKEN_FILE, json_encode($data));
  } else {
    exit('Invalid access token ' . var_export($accessToken, true));
  }
}