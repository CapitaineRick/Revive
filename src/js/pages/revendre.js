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
    
    // Setup signature canvas and form
    setupSignatureCanvas();
    setupSellForm();
});

function setupSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const saveButton = document.getElementById('saveButton');
    const signatureInput = document.getElementById('signatureInput');
    let isDrawing = false;

    // Set canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);

    clearButton.addEventListener('click', clearCanvas);
    saveButton.addEventListener('click', saveSignature);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                         e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        signatureInput.value = '';
    }

    function saveSignature() {
        signatureInput.value = canvas.toDataURL('image/png');
        alert('Signature enregistrée.');
    }
}

function setupSellForm() {
    const sellForm = document.getElementById('sell-form');
    const messageDiv = document.getElementById('sell-message');
    
    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(sellForm);
        const signatureInput = document.getElementById('signatureInput');
        
        // Validate signature
        if (!signatureInput.value) {
            messageDiv.innerHTML = '<div class="message error">Veuillez enregistrer votre signature.</div>';
            return;
        }
        
        // Create sell request object
        const sellRequest = {
            id: Date.now(),
            type: formData.get('type'),
            marque: formData.get('marques'),
            etat: formData.get('etat'),
            description: formData.get('description'),
            gender: formData.get('gender'),
            lastname: formData.get('lastname'),
            firstname: formData.get('firstname'),
            email: formData.get('email'),
            phone: formData.get('phone_number'),
            adresse: formData.get('adresse'),
            postalCode: formData.get('postal_code'),
            signature: signatureInput.value,
            timestamp: new Date().toISOString(),
            status: 'En attente'
        };
        
        // Store in localStorage (simulating database)
        const sellRequests = JSON.parse(localStorage.getItem('sellRequests') || '[]');
        sellRequests.push(sellRequest);
        localStorage.setItem('sellRequests', JSON.stringify(sellRequests));
        
        // Show success message
        messageDiv.innerHTML = '<div class="message success">Votre demande de revente a été soumise avec succès. Nous vous recontacterons bientôt.</div>';
        sellForm.reset();
        
        // Clear signature canvas
        const canvas = document.getElementById('signatureCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    });
}