<?php
session_start();
$cart = $_SESSION['cart'] ?? [];
$total = 0;
?>

<h1>Panier</h1>
<div>
    <?php if ($cart): ?>
        <?php foreach ($cart as $product_id => $item): ?>
            <div>
                <h2><?= htmlspecialchars($item['name']) ?></h2>
                <p>Prix unitaire : <?= htmlspecialchars($item['price']) ?> €</p>
                <p>Quantité : <?= htmlspecialchars($item['quantity']) ?></p>
                <p>Sous-total : <?= htmlspecialchars($item['price'] * $item['quantity']) ?> €</p>
                <form method="post" action="./partials/remove_cart.php">
                    <input type="hidden" name="product_id" value="<?= $product_id ?>">
                    <button type="submit">Retirer</button>
                </form>
            </div>
            <?php $total += $item['price'] * $item['quantity']; ?>
        <?php endforeach; ?>
        <h3>Total : <?= $total ?> €</h3>
        <form method="post" action="checkout.php">
            <button type="submit">Passer à la caisse</button>
        </form>
    <?php else: ?>
        <p>Votre panier est vide.</p>
    <?php endif; ?>
</div>

<?php session_destroy();
 ?>