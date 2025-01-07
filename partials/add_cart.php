<?php
session_start();
require '../Config/pdo.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id']) && is_numeric($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    if ($product_id > 0) {
        // Récupérer les détails du produit
        $stmt = $pdo->prepare("SELECT * FROM produits WHERE id = ?");
        $stmt->execute([$product_id]);
        $product = $stmt->fetch();

        if ($product) {
            // Initialiser le panier s'il n'existe pas
            if (!isset($_SESSION['cart'])) {
                $_SESSION['cart'] = [];
            }

            // Ajouter ou mettre à jour le produit dans le panier
            if (!isset($_SESSION['cart'][$product_id])) {
                $_SESSION['cart'][$product_id] = [
                    'name' => $product['nom'],
                    'price' => $product['prix'],
                    'quantity' => 1
                ];
            } else {
                $_SESSION['cart'][$product_id]['quantity']++;
            }
        } else {
            echo "Produit introuvable.";
            exit;
        }
    } else {
        echo "ID produit invalide.";
        exit;
    }
} else {
    echo "Requête invalide.";
    exit;
}

// Redirection après l'ajout au panier
header('Location: ' . $_SERVER['HTTP_REFERER']);
exit;
?>
