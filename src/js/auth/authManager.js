export class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }
    
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
    
    login(email, password) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateHeaderDisplay();
            return { success: true, message: `Bienvenue, ${user.username}!` };
        }
        
        return { success: false, message: 'Email ou mot de passe incorrect.' };
    }
    
    register(username, email, password) {
        // Validate password
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{7,}$/;
        if (!passwordRegex.test(password)) {
            return { 
                success: false, 
                message: 'Le mot de passe doit contenir au moins 7 caractères, dont une majuscule, une minuscule, et un chiffre.' 
            };
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Un compte avec cet email existe déjà.' };
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true, message: 'Inscription réussie. Vous pouvez maintenant vous connecter.' };
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateHeaderDisplay();
        window.location.href = '/';
    }
    
    updateHeaderDisplay() {
        const usernameDisplay = document.getElementById('username-display');
        const accountDropdown = document.getElementById('account-dropdown');
        const cartMenu = document.getElementById('cart-menu');
        
        if (this.currentUser) {
            if (usernameDisplay) {
                usernameDisplay.textContent = this.currentUser.username;
            }
            if (accountDropdown) {
                accountDropdown.innerHTML = `
                    <a href="/account.html">Mon profil</a>
                    <a href="#" onclick="window.authManager.logout()">Déconnexion</a>
                `;
            }
            if (cartMenu) {
                cartMenu.style.display = 'block';
            }
        } else {
            if (usernameDisplay) {
                usernameDisplay.textContent = '';
            }
            if (accountDropdown) {
                accountDropdown.innerHTML = `
                    <a href="/account.html">Se connecter</a>
                `;
            }
            if (cartMenu) {
                cartMenu.style.display = 'none';
            }
        }
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
}