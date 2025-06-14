import { loadHeader } from '../components/header.js';
import { loadFooter } from '../components/footer.js';
import { AuthManager } from '../auth/authManager.js';
import { CartManager } from '../cart/cartManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Load common components
    await loadHeader();
    await loadFooter();
    
    // Initialize managers
    const authManager = new AuthManager();
    const cartManager = new CartManager();
    
    // Make managers globally available
    window.authManager = authManager;
    window.cartManager = cartManager;
    
    // Update header with user info
    authManager.updateHeaderDisplay();
    
    // Load account content
    loadAccountContent(authManager, cartManager);
});

function loadAccountContent(authManager, cartManager) {
    const accountSection = document.getElementById('account-section');
    
    if (authManager.isLoggedIn()) {
        // User is logged in - show user hub
        accountSection.innerHTML = `
            <div style="display: flex; justify-content: center; padding-top: 2%; flex-direction: column;">
                <div class="hub">
                    <h2>Bienvenue, ${authManager.currentUser.username}!</h2>
                    <p>Vous êtes connecté. Bienvenue dans votre hub utilisateur.</p>
                    <button onclick="window.authManager.logout()" class="logout-btn">Se déconnecter</button>
                </div>
                <hr>
                <div id="user-cart">
                    <h3>Mon Panier</h3>
                    <div id="cart-content"></div>
                </div>
            </div>
        `;
        
        // Update cart display
        cartManager.updateCartDisplay();
    } else {
        // User is not logged in - show login/register forms
        accountSection.innerHTML = `
            <div style="margin: auto; display: flex; justify-content: center; padding-top: 2%">
                <div class="main">
                    <input type="checkbox" id="chk" aria-hidden="true">

                    <div class="signup">
                        <form id="signup-form">
                            <label for="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="username" placeholder="User name" required>
                            <input type="email" name="email" placeholder="Email" required>
                            <input type="password" name="password" placeholder="Password" required>
                            <button type="submit">Sign up</button>
                        </form>
                    </div>

                    <div class="login">
                        <form id="login-form">
                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="email" name="email" placeholder="Email" required>
                            <input type="password" name="password" placeholder="Password" required>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="auth-message" style="text-align: center; margin-top: 20px;"></div>
        `;
        
        // Add event listeners for forms
        setupAuthForms(authManager);
    }
}

function setupAuthForms(authManager) {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('auth-message');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const result = authManager.register(
            formData.get('username'),
            formData.get('email'),
            formData.get('password')
        );
        
        messageDiv.innerHTML = `<p style="color: ${result.success ? 'green' : 'red'}">${result.message}</p>`;
        
        if (result.success) {
            signupForm.reset();
        }
    });
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const result = authManager.login(
            formData.get('email'),
            formData.get('password')
        );
        
        if (result.success) {
            window.location.reload();
        } else {
            messageDiv.innerHTML = `<p style="color: red">${result.message}</p>`;
        }
    });
}