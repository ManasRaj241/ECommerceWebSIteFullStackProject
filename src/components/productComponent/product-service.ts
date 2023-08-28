export class ProductService {
    private static instance: ProductService;
  
    private products: Product[] = []; // Store the products here

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
  
    addProduct(product: Product) {
      // Add the product to your products array
      this.products.push(product);
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
  