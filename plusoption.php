<?php include "head.php"; ?>
<?php include "./Config/pdo.php"; ?>

<section>
    <?php
    $type = $_GET['option'] ?? "*"; // Récupération du type de produit depuis l'URL

    if ($type === null) {
        die("Le paramètre 'Type' est requis.");
    }

    // Configuration pour la pagination
    $products_per_page = 8;
    $current_page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
    $current_page = max(1, $current_page); // La page doit être au moins 1

    // Calcul de l'index de départ
    $start_index = ($current_page - 1) * $products_per_page;

    // Récupération des produits avec limite pour la pagination
    $sql = "SELECT SQL_CALC_FOUND_ROWS * FROM produits WHERE type_produit = :type LIMIT :start, :limit";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':type', $type, PDO::PARAM_STR);
    $stmt->bindValue(':start', $start_index, PDO::PARAM_INT);
    $stmt->bindValue(':limit', $products_per_page, PDO::PARAM_INT);
    $stmt->execute();
    $produit_cat = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Récupération du nombre total de produits
    $total_products = $pdo->query("SELECT FOUND_ROWS()")->fetchColumn();
    $total_pages = ceil($total_products / $products_per_page);
    ?>

    <h1>Produits de type : <?= htmlspecialchars($type) ?></h1>

    <div class="container">
        <div>
            <?php if ($produit_cat): ?>
                <?php foreach ($produit_cat as $produit): ?>
                    <div class="produit_moreoption" style="display: flex;">
                        <img src="./assests/photo/Ryzen 7 OC.png" alt="" style="width: 20%;">
                    <div style="padding-left:2%">

                        <h3>
                            <a href="./produit.php?product_name=<?php echo urlencode($produit['nom']); ?>">
                                <?php echo htmlspecialchars($produit['nom']); ?>
                            </a>
                        </h3>
                        <p>Prix : <?= htmlspecialchars($produit['prix']) ?> €</p>
                        <p>Description : <?= htmlspecialchars($produit['description']) ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>Aucun produit trouvé pour ce type.</p>
            <?php endif; ?>
        </div>

        <div class="pagination">
            <?php if ($current_page > 1): ?>
                <a href="?option=<?= urlencode($type) ?>&page=<?= $current_page - 1 ?>">&laquo; Précédent</a>
            <?php endif; ?>

            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <a href="?option=<?= urlencode($type) ?>&page=<?= $i ?>" class="<?= $i === $current_page ? 'active' : '' ?>"><?= $i ?></a>
            <?php endfor; ?>

            <?php if ($current_page < $total_pages): ?>
                <a href="?option=<?= urlencode($type) ?>&page=<?= $current_page + 1 ?>">Suivant &raquo;</a>
            <?php endif; ?>
        </div>
    </div>


</section>    <?php include "./partials/footer.php"; ?>
