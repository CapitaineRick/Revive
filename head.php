<?php require 'Config/pdo.php';
include "./partials/funtion.php";
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Revive</title>
  <link rel="stylesheet" href="./styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
  <script src="./partials/code.js" defer></script>
  <link rel="shortcut icon" type="image/x-icon" href="./assests/rick00000_logo_devellopement_durable_technologie_c2a4787f-d889-4b54-b67d-7c18a962bc2a-removebg-preview.png" />



</head>

<body>
  <header>
    <nav>
      <div class="logo">
        <a href="#">
          <img src="./assests/rick00000_logo_devellopement_durable_technologie_c2a4787f-d889-4b54-b67d-7c18a962bc2a-removebg-preview.png" alt="">
        </a>
      </div>
      <div class="menu">
        <a href="./index.php">Home</a>
        <div class="dropdown">
          <a href="./acheter.php">Achat</a>
          <div class="dropdown-content">
            <a href="plusoption.php?option=Ordinateur">Ordinateur</a>
            <a href="./plusoption.php?option=Consoles">Consoles</a>
            <a href="./plusoption.php?option=Pièces détachées">Piece d'étachées</a>
          </div>
        </div>
        <a href="./revendre.php">Revente</a>
        <a href="./histoire.php">Histoire</a>
        <a href="./contact.php">Contact</a>
      </div>
      <div class="menu">
        <div class="dropdown">
          <a href="./account.php"><img id="account_img" src="./assests/la-personne.png" alt=""></a>



          <?php $user = get_user_by_session($pdo);
          if (!is_null($user)) {
            echo htmlspecialchars($user['user']);
          }


          ?>

          <div class="dropdown-content">
            <?php if (!is_null($user)) {
              echo "<a href='./account.php'>Mon profile</a>";
              echo "<a href='./partials/logout.php'>Déconexion</a>";
            } else {

              echo "<a href='./account.php'>Se connecter</a>
";
            }

            ?></div>
        </div>
      </div>
      <?php if (!is_null($user)) {
      echo"<div class='menu'>";
       echo" <div class='dropdown'>";
        echo"  <a href='#'><img id='cart_img' src='./assests/shopping-cart.png' alt=''></a>";
        echo"  <div class='dropdown-content'>";
            include "./partials/cart.php";
          echo "</div>
        </div>
      </div> ";}?>
    </nav>

  </header>