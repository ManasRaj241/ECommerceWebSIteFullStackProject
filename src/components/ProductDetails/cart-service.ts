export class CartService{
    private static instance: CartService;

    private cartProduct: Cart[] = [];

    private constructor() {
        
    }

    async fetchCartProducts() {
        const response = await fetch('http://localhost:8080/cart');
        const cartProduct = await response.json();
        this.cartProduct = cartProduct;
    }

    static getInstance(): CartService {
      if (!CartService.instance) {
        CartService.instance = new CartService();
      }
      return CartService.instance;
    }

    async addCartProduct(cartProduct: Cart) {
      this.cartProduct.push(cartProduct);
      const response = await fetch('http://localhost:8080/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartProduct),
        });

        if (response.ok) {
            console.log('Product added successfully');
        } else {
            console.error('Failed to add product');
        }
    }

    getCartProducts(): Cart[] {
      return this.cartProduct;
    }
}

export interface Cart{
    id: number;
    imagePath: string;
    productName: string;
    price: string;
    quantity: Number;
}