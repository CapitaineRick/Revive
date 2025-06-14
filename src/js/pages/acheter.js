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
    
    // Load products
    const products = await productService.getAllProducts();
    
    // Filter and display products by category
    displayProductsByCategory(products, 'coup_de_coeur', 'coup-de-coeur');
    displayProductsByCategory(products, 'Ordinateur', 'ordinateurs');
    displayProductsByCategory(products, 'Consoles', 'consoles');
    displayProductsByCategory(products, 'Accessoires', 'accessoires');
    displayProductsByCategory(products, 'Pièces détachées', 'pieces-detachees');
});

function displayProductsByCategory(products, category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let filteredProducts;
    if (category === 'coup_de_coeur') {
        filteredProducts = products.filter(p => p.coup_de_coeur).slice(0, 10);
    } else {
        filteredProducts = products.filter(p => p.type_produit === category).slice(0, 10);
    }
    
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="produit" style="position: relative;">
            <div class="product-name" style="position: absolute; z-index: 1; top: 8px; left: 1%; background-color: lightgrey; padding: 1%; border: solid lightgrey 1px; border-radius: 5px; opacity: 70%; max-width: 150px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                ${product.nom}
            </div>
            
            <p class="product-price" style="position: absolute; z-index: 1; left: 5%; top: 110px; background-color: lightgrey; padding: 1%; border: solid lightgrey 1px; border-radius: 5px; opacity: 95%;">
                ${product.prix}€
            </p>
            
            <a href="/product.html?id=${product.id}" style="border: none; background: none; padding: 0;">
                <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400" alt="${product.nom}" class="product-image">
            </a>
        </div>
    `;
}