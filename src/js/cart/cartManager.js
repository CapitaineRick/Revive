export class CartManager {
    constructor() {
        this.cart = this.getCart();
        this.updateCartDisplay();
    }
    
    getCart() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : {};
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
    }
    
    addToCart(product) {
        if (!window.authManager?.isLoggedIn()) {
            alert('Veuillez vous connecter pour ajouter des produits au panier.');
            return;
        }
        
        const productId = product.id.toString();
        if (this.cart[productId]) {
            this.cart[productId].quantity += 1;
        } else {
            this.cart[productId] = {
                id: product.id,
                name: product.nom,
                price: product.prix,
                quantity: 1,
                image: product.image
            };
        }
        
        this.saveCart();
        this.showAddToCartFeedback();
    }
    
    removeFromCart(productId) {
        delete this.cart[productId];
        this.saveCart();
    }
    
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.cart[productId].quantity = quantity;
            this.saveCart();
        }
    }
    
    getCartTotal() {
        return Object.values(this.cart).reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    getCartItemCount() {
        return Object.values(this.cart).reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    }
    
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartContent = document.getElementById('cart-content');
        
        if (cartCount) {
            const itemCount = this.getCartItemCount();
            cartCount.textContent = itemCount;
            cartCount.style.display = itemCount > 0 ? 'inline' : 'none';
        }
        
        if (cartContent) {
            this.renderCartContent(cartContent);
        }
    }
    
    renderCartContent(container) {
        const cartItems = Object.values(this.cart);
        
        if (cartItems.length === 0) {
            container.innerHTML = '<p>Votre panier est vide.</p>';
            return;
        }
        
        const total = this.getCartTotal();
        
        container.innerHTML = `
            <h3>Panier</h3>
            <div class="cart-items">
                ${cartItems.map(item => `
                    <div class="cart-item">
                        <h4>${item.name}</h4>
                        <p>Prix unitaire: ${item.price.toFixed(2)} €</p>
                        <p>Quantité: ${item.quantity}</p>
                        <p>Sous-total: ${(item.price * item.quantity).toFixed(2)} €</p>
                        <button onclick="window.cartManager.removeFromCart('${item.id}')" class="remove-btn">
                            Retirer
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <h4>Total: ${total.toFixed(2)} €</h4>
                <button onclick="window.cartManager.checkout()" class="checkout-btn">
                    Passer à la caisse
                </button>
            </div>
        `;
    }
    
    showAddToCartFeedback() {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Produit ajouté au panier !';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #06dd60;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    checkout() {
        if (Object.keys(this.cart).length === 0) {
            alert('Votre panier est vide.');
            return;
        }
        
        // Simulate checkout process
        alert(`Commande passée ! Total: ${this.getCartTotal().toFixed(2)} €`);
        this.cart = {};
        this.saveCart();
    }
    
    clearCart() {
        this.cart = {};
        this.saveCart();
    }
}