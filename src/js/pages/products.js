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
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const page = parseInt(urlParams.get('page')) || 1;
    
    // Load and display products
    await loadProducts(productService, category, page);
});

async function loadProducts(productService, category, currentPage) {
    const productsPerPage = 8;
    let allProducts = [];
    
    if (category) {
        allProducts = await productService.getProductsByCategory(category);
        document.getElementById('category-title').textContent = `Produits de type : ${category}`;
    } else {
        allProducts = await productService.getAllProducts();
    }
    
    // Calculate pagination
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = allProducts.slice(startIndex, endIndex);
    
    // Display products
    displayProducts(productsToShow);
    
    // Display pagination
    displayPagination(currentPage, totalPages, category);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>Aucun produit trouvé pour cette catégorie.</p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => {
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
        
        return `
            <div class="produit_moreoption" style="display: flex; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                <img src="${imagePath}" alt="${product.nom}" style="width: 20%; border-radius: 5px;">
                <div style="padding-left: 2%; flex: 1;">
                    <h3>
                        <a href="/product.html?id=${product.id}" style="color: #333; text-decoration: none;">
                            ${product.nom}
                        </a>
                    </h3>
                    <p><strong>Prix:</strong> ${product.prix} €</p>
                    <p><strong>État:</strong> ${product.etat_produit}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <button onclick="addToCartFromList(${product.id})" class="add-to-cart-btn" style="background: #06dd60; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function displayPagination(currentPage, totalPages, category) {
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        const prevUrl = category ? 
            `?category=${encodeURIComponent(category)}&page=${currentPage - 1}` : 
            `?page=${currentPage - 1}`;
        paginationHTML += `<a href="${prevUrl}">&laquo; Précédent</a>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageUrl = category ? 
            `?category=${encodeURIComponent(category)}&page=${i}` : 
            `?page=${i}`;
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<a href="${pageUrl}" class="${activeClass}">${i}</a>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextUrl = category ? 
            `?category=${encodeURIComponent(category)}&page=${currentPage + 1}` : 
            `?page=${currentPage + 1}`;
        paginationHTML += `<a href="${nextUrl}">Suivant &raquo;</a>`;
    }
    
    pagination.innerHTML = paginationHTML;
}

// Global function to add product to cart from product list
window.addToCartFromList = async function(productId) {
    const productService = new ProductService();
    const product = await productService.getProductById(productId.toString());
    
    if (product && window.cartManager) {
        window.cartManager.addToCart(product);
    }
};