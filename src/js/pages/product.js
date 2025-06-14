import { loadHeader } from '../components/header.js';
import { loadFooter } from '../components/footer.js';
import { AuthManager } from '../auth/authManager.js';
import { CartManager } from '../cart/cartManager.js';
import { ProductService } from '../services/productService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Load common components
    await loadHeader();
    await loadFooter();
    
    // Initialize managers
    const authManager = new AuthManager();
    const cartManager = new CartManager();
    const productService = new ProductService();
    
    // Make managers globally available
    window.authManager = authManager;
    window.cartManager = cartManager;
    
    // Update header with user info
    authManager.updateHeaderDisplay();
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        const product = await productService.getProductById(productId);
        if (product) {
            displayProduct(product);
        } else {
            document.getElementById('product-section').innerHTML = '<p>Produit non trouvé.</p>';
        }
    } else {
        document.getElementById('product-section').innerHTML = '<p>ID de produit manquant.</p>';
    }
});

function displayProduct(product) {
    const productSection = document.getElementById('product-section');
    
    // Utiliser l'image spécifique du produit ou une image par défaut
    let imagePath = './assests/photo/Ryzen 7 OC.png'; // Image par défaut
    
    // Mapper certains produits à leurs images spécifiques
    if (product.nom.includes('PlayStation') || product.nom.includes('PS5')) {
        imagePath = './assests/photo/PS5 Slim.png';
    } else if (product.nom.includes('HP') || product.nom.includes('Inspiron')) {
        imagePath = './assests/photo/PC Portable HP 15-fd.png';
    } else if (product.nom.includes('Câble') || product.nom.includes('USB')) {
        imagePath = './assests/photo/Chargeur USB.png';
    }
    
    productSection.innerHTML = `
        <h1>${product.nom}</h1>
        <div class="produits">
            <img src="${imagePath}" alt="${product.nom}">
            <div class="description_produit">
                <p><strong>Type:</strong> ${product.type_produit}</p>
                <p><strong>État produit:</strong> ${product.etat_produit}</p>
                <p><strong>Prix:</strong> ${product.prix}€</p>
                <p><strong>Description:</strong> ${product.description}</p>
                
                <button onclick="addToCart(${product.id})" class="addtocart">
                    <div class="pretext">
                        <i class="fas fa-cart-plus"></i> AJOUTER AU PANIER
                    </div>
                    <div class="pretext done">
                        <div class="posttext"><i class="fas fa-check"></i> AJOUTÉ</div>
                    </div>
                </button>
            </div>
        </div>
    `;
}

// Global function to add product to cart
window.addToCart = async function(productId) {
    const productService = new ProductService();
    const product = await productService.getProductById(productId.toString());
    
    if (product && window.cartManager) {
        window.cartManager.addToCart(product);
        
        // Add visual feedback
        const button = document.querySelector('.addtocart');
        const done = button.querySelector('.done');
        
        done.style.transform = "translate(0px)";
        setTimeout(() => {
            done.style.transform = "translate(-110%) skew(-40deg)";
        }, 2000);
    }
};