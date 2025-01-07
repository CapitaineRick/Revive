<?php include "./head.php"; ?>

<section class="revente">
    <h1>TYPE DE PRODUIT</h1>

    <form action="submit_form.php" method="POST" enctype="multipart/form-data">
        <div class="objet">
            <div>
                <label for="type">Types :</label>
                <select name="type" id="type" required>
                    <option value="">-</option>
                    <option value="Ordinateur">Ordinateur</option>
                    <option value="Console">Console</option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Pièces détachées">Pièces détachées</option>
                    <option value="Autres">Autres</option>
                </select>
            </div>

            <div>
                <label for="marques">Marques :</label>
                <select name="marques" id="marques" required>
                    <option value="">-</option>
                    <option value="Apple">Apple</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="Sega">Sega</option>
                    <option value="Sony">Sony</option>
                    <option value="Samsung">Samsung</option>
                    <option value="HP">HP</option>
                </select>
            </div>

            <div>
                <label>État de l'équipement :</label>
                <input value="neuf" name="etat" type="radio" id="neuf" required>
                <label for="neuf">Neuf</label>
                <input value="très bon" name="etat" type="radio" id="tres_bon">
                <label for="tres_bon">Très bon</label>
                <input value="bon" name="etat" type="radio" id="bon">
                <label for="bon">Bon</label>
                <input value="satisfaisant" name="etat" type="radio" id="satisfaisant">
                <label for="satisfaisant">Satisfaisant</label>
                <input value="pièces détachées" name="etat" type="radio" id="pieces_detachees">
                <label for="pieces_detachees">Pièces détachées</label>
            </div>

            <div>
                <label for="photo_produit">Photo produit :</label>
                <input type="file" name="photo_produit" id="photo_produit" accept="image/*" required>
            </div>

            <h2>Description produit</h2>
            <textarea name="description" id="description" rows="5" placeholder="Décrivez le produit..." required></textarea>
        </div>


        <div class="civilite">
        <h1>Informations Personnelles</h1>
            <div>
                <label>Genre :</label>
                <input value="MR" name="gender" type="radio" id="mr" required>
                <label for="mr">M.</label>
                <input value="MD" name="gender" type="radio" id="md">
                <label for="md">Mme</label>
            </div>
            <div>
                <label for="lastname">Nom :</label>
                <input placeholder="Votre NOM..." type="text" name="lastname" id="lastname" required>
            </div>
            <div>
                <label for="firstname">Prénom :</label>
                <input placeholder="Votre Prénom..." type="text" name="firstname" id="firstname" required>
            </div>
            <div>
                <label for="email">Email :</label>
                <input placeholder="Votre adresse mail" type="email" name="email" id="email" required>
            </div>
            <div>
                <label for="phone_number">Numéro de téléphone :</label>
                <input placeholder="Votre numéro de téléphone" type="tel" name="phone_number" id="phone_number" required>
            </div>
            <div><label for="Adresse">Adresse :</label>
                <input placeholder="Rue" type="text" name="adresse" id="postal_code" required>
            </div>
            <div>
                <label for="postal_code">Code postal :</label>
                <input placeholder="Votre code postal" type="text" name="postal_code" id="postal_code" required>
            </div>


            <p>Veuillez signer ci-dessous :</p>
            <canvas id="signatureCanvas" width="500" height="200"></canvas>
            <div class="buttons">
                <button type="button" id="clearButton">Effacer</button>
                <button type="button" id="saveButton">Enregistrer</button>
            </div>
            <input type="hidden" name="signature" id="signatureInput">

            <div>
                <label for="id_card">Ajoutez votre carte d'identité :</label>
                <input type="file" name="id_card" id="id_card" accept="image/*" required>
            </div>

            <div>
                <input value="Avoir pris connaissance des informations" name="info" type="checkbox" id="info" required>
                <label for="info">Avoir pris connaissance</label>
            </div>

            <div>
                <button type="submit" name="submit">Valider ma déposition</button>
            </div>
        </div>
    </form>

</section>
<?php include "./partials/footer.php"; ?>

<script>
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const saveButton = document.getElementById('saveButton');
    const signatureInput = document.getElementById('signatureInput');
    let isDrawing = false;

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', draw);
    clearButton.addEventListener('click', clearCanvas);
    saveButton.addEventListener('click', saveSignature);

    function draw(e) {
        if (!isDrawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        signatureInput.value = canvas.toDataURL('image/png');
        alert('Signature enregistrée.');
    }
</script>