export async function loadFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    const currentYear = new Date().getFullYear();
    
    footer.innerHTML = `
        <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
            <div>
                <p>&copy; ${currentYear} Revive. Tous droits réservés.</p>
                <ul style="list-style: none; padding: 0; display: flex; justify-content: center; gap: 15px;">
                    <li><a href="/mentions-legales.html" style="color: #f2f2f2; text-decoration: none;">Mentions légales</a></li>
                    <li><a href="/politique-confidentialite.html" style="color: #f2f2f2; text-decoration: none;">Politique de confidentialité</a></li>
                    <li><a href="/conditions-utilisation.html" style="color: #f2f2f2; text-decoration: none;">Conditions générales d'utilisation</a></li>
                    <li><a href="/charte-legale.html" style="color: #f2f2f2; text-decoration: none;">Charte légale</a></li>
                </ul>
            </div>
        </div>
    `;
}