<?php
require 'Config/pdo.php';
$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération et nettoyage des données
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validation des champs
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $error = "Tous les champs sont obligatoires.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Adresse email invalide.";
    } else {
        // Stocker dans la base de données
        try {
            $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $email, $subject, $message]);
            $success = "Votre message a été envoyé avec succès.";
        } catch (PDOException $e) {
            $error = "Erreur lors de l'enregistrement de votre message : " . $e->getMessage();
        }
    }
}

include "./head.php";
?>
<section>
    <div class="container">
        <div class="form-container">
            <?php if ($success): ?>
                <div class="message success"><?= htmlspecialchars($success) ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="message error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            <h2>Contacter Nous !</h2>
            <form method="post" action="contact.php">

                <div class="form-group">
                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" required value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="subject">Sujet :</label>
                    <input type="text" id="subject" name="subject" required value="<?= htmlspecialchars($_POST['subject'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="message">Message :</label>
                    <textarea id="message" name="message" required><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    </div>

    <div class="reseaux">
        <h2>Nos Réseaux</h2>

        <div>
        <img class="logo-reseau" src="./assests/inbox-vector-icon-png_267453.jpg"><label for="">revive.co@gmail.com</label>            

        </div>
        <div>
        <img class="logo-reseau" src="./assests/pngtree-phone-icon-in-solid-circle-png-image_2380227-removebg-preview.png"><label for="">01 42 22 99 88 XX</label>
        </div>
        <div>
        <a href="https://www.instagram.com/reviveipssi?igsh=MWU5d2NoMzlucnhneA=="><img class="logo-reseau" src="./assests/Instagram_icon.png.webp" alt=""></img><label target="_blank">@reviveipssi</label></a> 
        </div>
<div>
<img class="logo-reseau" src="./assests/Logo_of_Twitter.svg.png" alt=""><a href=""></a></img><label for="">Twitter</label>

</div>
    </div>
</section>
<?php include "./partials/footer.php"; ?>

</body>

</html>