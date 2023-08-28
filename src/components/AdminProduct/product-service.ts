export class ProductService {
    private static instance: ProductService;
  
    private products: Product[] = []; 

    private constructor() {
      
    }

    async fetchProducts() {
        const response = await fetch('http://localhost:8080/products');
        const products = await response.json();
        this.products = products;
      }
      
  
    static getInstance(): ProductService {
      if (!ProductService.instance) {
        ProductService.instance = new ProductService();
      }
      return ProductService.instance;
    }
  
    async addProduct(product: Product) {
      this.products.push(product);
      const response = await fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            console.log('Product added successfully');
        } else {
            console.error('Failed to add product');
        }
    }
  
    getProducts(): Product[] {
      // Return the entire products array
      return this.products;
    }
}
  
export interface Product {
    id: number;
    imagePath: string;
    productName: string;
    price: string;
  }
  
