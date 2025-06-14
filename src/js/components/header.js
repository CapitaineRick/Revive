export async function loadHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    header.innerHTML = `
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="./assests/revive-high-resolution-logo-removebg-preview (1).png" alt="Revive Logo">
                </a>
            </div>
            <div class="menu">
                <a href="/">Home</a>
                <div class="dropdown">
                    <a href="/acheter.html">Achat</a>
                    <div class="dropdown-content">
                        <a href="/products.html?category=Ordinateur">Ordinateur</a>
                        <a href="/products.html?category=Consoles">Consoles</a>
                        <a href="/products.html?category=Pièces détachées">Pièces détachées</a>
                        <a href="/products.html?category=Accessoires">Accessoires</a>
                    </div>
                </div>
                <a href="/revendre.html">Revente</a>
                <a href="/histoire.html">Histoire</a>
                <a href="/contact.html">Contact</a>
            </div>
            <div class="menu">
                <div class="dropdown">
                    <a href="/account.html">
                        <img id="account_img" src="./assests/la-personne.png" alt="Account">
                    </a>
                    <span id="username-display"></span>
                    <div class="dropdown-content" id="account-dropdown">
                        <a href="/account.html">Se connecter</a>
                    </div>
                </div>
            </div>
            <div class="menu" id="cart-menu" style="display: none;">
                <div class="dropdown">
                    <a href="#" id="cart-toggle">
                        <img id="cart_img" src="./assests/shopping-cart.png" alt="Cart">
                        <span id="cart-count" class="cart-count">0</span>
                    </a>
                    <div class="dropdown-content" id="cart-dropdown">
                        <div id="cart-content">
                            <p>Votre panier est vide.</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
}