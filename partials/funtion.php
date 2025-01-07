<?php

function affichage_produit_vitrine($produits)
{

    echo "
        <style>
        .product-image {
            cursor: pointer;
            height: 11vw;
            width: 11vw;
            justify-content: space-around;
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            transition: background 0.3s;
            margin-right: 20px;
            display:flex;
    
        }
    
        .product-image:hover {
            background: lightgrey;
        }
       .liste_produits {
        padding-left: 2%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
            white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;

}
    </style>";
    $counter = 0;
    foreach ($produits as $produit) {
        $counter++;

        if ($counter == 10) {
            break; // Arrête le foreach après 10 itérations
        }
        echo "<div class='produit' style='position: relative;    '>
                <form action='./produit.php' method='GET' style='display: inline;'>
                    <input type='hidden' name='product_name' value='" . htmlspecialchars($produit['nom']) . "'>
                    <input type='hidden' name='product_price' value='" . htmlspecialchars($produit['prix']) . "'>
                    <input type='hidden' name='product_description' value='" . htmlspecialchars($produit['description']) . "'>
    
    
                    <div for='' style='position: absolute; z-index: 1; top: 8px; left: 1%; background-color: lightgrey; padding: 1%; border: solid lightgrey 1px; border-radius: 5px; opacity: 70%;    max-width: 150px; text-overflow: ellipsis;white-space: nowrap;    overflow: hidden;'>
                        " . htmlspecialchars($produit['nom']) . "
                    </div>    
    
                    <p style='position: absolute; z-index: 1; left: 5%; top: 110px; background-color: lightgrey; padding: 1%; border: solid lightgrey 1px; border-radius: 5px; opacity: 95%; '>
                        " . htmlspecialchars($produit['prix']) . "$" . "
                    </p>
    
                    <button type='submit' style='border: none; background: none; padding: 0;'>
                      " . //  <img src='./assests/photo/" . htmlspecialchars($produit['nom']) . ".png' alt='Product Image' class='product-image''>
            "<img src='./assests/photo/Ryzen 7 OC.png' alt='Product Image' class='product-image''>
                    
                        </button>
                </form>
            </div>";
    }
}

function get_user_by_session($pdo)
{
    if (isset($_COOKIE['session'])) {
        $session_cookie = $_COOKIE['session'];

        // Rechercher l'utilisateur dans la base de données
        $stmt = $pdo->prepare("SELECT * FROM account WHERE session_cookie = ?");
        $stmt->execute([$session_cookie]);

        return $stmt->fetch(); // Retourne les informations de l'utilisateur
    }
    return null; // Aucun utilisateur trouvé
}
