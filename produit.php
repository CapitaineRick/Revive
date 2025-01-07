<?php 
include "head.php";
include "./Config/pdo.php";

$product_name = $_GET['product_name'] ?? null;

if ($product_name === null) {
    die("Le paramètre 'product_name' est requis.");
} else {
    $sql = "SELECT * FROM produits WHERE nom = :product_name";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['product_name' => $product_name]);
    $produit = $stmt->fetch(PDO::FETCH_ASSOC);
}

?>

<section>
    <h1><?php echo htmlspecialchars($product_name); ?></h1>

    <div class="produits">
<!--         <img src='./assets/photo/<?php echo htmlspecialchars($product_name); ?>.png' alt='<?php echo htmlspecialchars($product_name); ?>' class='img_produit'>
 -->   <img src="./assests/photo/Ryzen 7 OC.png" alt="">
 <div class="description_produit">
        <p>Type : <?php echo htmlspecialchars($produit['type_produit']); ?></p>
        <p>État produit : <?php echo htmlspecialchars($produit['etat_produit']); ?></p>
        <p>Prix : <?php echo htmlspecialchars($produit['prix']); ?>$</p>
        <p>Fiche technique : <?php echo htmlspecialchars($produit['description']); ?></p>

        <form action="./partials/add_cart.php" method="POST">
            <input type="hidden" name="product_id" value="<?php echo $produit['id']; ?>">
            <button type="submit" class="addtocart">
                <div class="pretext">
                    <i class="fas fa-cart-plus"></i> ADD TO CART
                </div>
                <div class="pretext done">
                    <div class="posttext"><i class="fas fa-check"></i> ADDED</div>
                </div>
            </button>
        </form>
    </div>
 </div>



</section>
<?php include "./partials/footer.php"; ?>

</body>
</html>
