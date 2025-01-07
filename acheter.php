<?php include "./head.php"; ?>

<?php
include "./Config/pdo.php";





$sql = "SELECT * FROM produits WHERE Coup_de_coeur = TRUE";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$produits_coeur = $stmt->fetchAll();


$sql = "SELECT * FROM produits WHERE type_produit = 'Ordinateur'";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$produits_ordinateur = $stmt->fetchAll();

$sql = "SELECT * FROM produits WHERE type_produit = 'Consoles'";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$produits_consoles = $stmt->fetchAll();

$sql = "SELECT * FROM produits WHERE type_produit = 'Accessoires'";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$produits_accessoires = $stmt->fetchAll();

$sql = "SELECT * FROM produits WHERE type_produit = 'Pièces détachées'";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$produits_piece = $stmt->fetchAll();


?>

<section>
    <h1>Coup de coeur</h1>
    <div class="liste_produits" style="overflow-y: hidden; ">

        <?php affichage_produit_vitrine($produits_coeur) ?>

    </div>

        <h1>Ordinateurs</h1>
        <div class="liste_produits" style="overflow-y: hidden;">

            <?php affichage_produit_vitrine($produits_ordinateur) ?>

        </div>

        <div class="moreoption">
        <form action="./plusoption.php" method="GET">

            <button class="option" type='submit' name="option" value="Ordinateur">
                <p>Plus d'option &rarr;</p>
            </button>
        </form>
        </div>

        <h1>Consoles</h1>
        <div class="liste_produits" style="overflow-y: hidden;">

            <?php affichage_produit_vitrine($produits_consoles) ?>
        </div>
        <div class="moreoption">
        <form action="./plusoption.php" method="GET">
            <button class="option" type='submit' name="option" value="Consoles">
                <p>Plus d'option &rarr;</p>
            </button></form>
        </div>
        <h1>Accessoires</h1>
        <div class="liste_produits" style="overflow-y: hidden;">

            <?php affichage_produit_vitrine($produits_accessoires) ?>

        </div>
        <div class="moreoption">
        <form action="./plusoption.php" method="GET">
            <button class="option" type='submit' name="option" value="Accessoires">
                <p>Plus d'option &rarr;</p></button>
            </button>
        </div>
        <h1>Pièces détachées</h1>
        <div class="liste_produits" style="overflow-y: hidden;">

            <?php affichage_produit_vitrine($produits_piece) ?>
        </div>

        <div class="moreoption">
        <form action="./plusoption.php" method="GET">
            <button type='submit' class="option" name="option" value="Pièces détachées">
                <p>Plus d'option &rarr;</p>
            </button></form>
        </div>

    </form>
    </div>

    <div class="bas de ">




</section>
<?php include "./partials/footer.php";?>


</body>

</html>