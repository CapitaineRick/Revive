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
    
    // Setup contact form
    setupContactForm();
});

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.getElementById('contact-message');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
            messageDiv.innerHTML = '<div class="message error">Tous les champs sont obligatoires.</div>';
            return;
        }
        
        if (!isValidEmail(contactData.email)) {
            messageDiv.innerHTML = '<div class="message error">Adresse email invalide.</div>';
            return;
        }
        
        // Store message in localStorage (simulating database storage)
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Show success message
        messageDiv.innerHTML = '<div class="message success">Votre message a été envoyé avec succès.</div>';
        contactForm.reset();
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}