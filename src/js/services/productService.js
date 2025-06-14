export class ProductService {
    async getAllProducts() {
        try {
            const response = await fetch('/src/data/products.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }
    
    async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(p => p.id === parseInt(id));
    }
    
    async getProductsByCategory(category) {
        const products = await this.getAllProducts();
        return products.filter(p => p.type_produit === category);
    }
    
    async getFeaturedProducts() {
        const products = await this.getAllProducts();
        return products.filter(p => p.coup_de_coeur);
    }
}