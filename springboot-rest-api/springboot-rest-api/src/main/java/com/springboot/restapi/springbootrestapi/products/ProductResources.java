package com.springboot.restapi.springbootrestapi.products;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class ProductResources {
	
	private ProductService productService;
	private CartService cartService;
	
	public ProductResources(ProductService productService, CartService cartService) {
		super();
		this.productService = productService;
		this.cartService = cartService;
	}

	@RequestMapping("/products")
	public List<Products> retrieveAllProducts(){
		return productService.retrieveAllProducts();
	}
	
	@RequestMapping("/products/{productId}")
	public Products retrieveProductById(@PathVariable String productId){
		Products product = productService.retrieveProductById(productId);
		if(product == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		return product;
	}
	
	@RequestMapping("/products/{productId}/price")
	public String retrievePriceOfProduct(@PathVariable String productId){
		Products product = productService.retrieveProductById(productId);
		if(product == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		return product.getPrice();
	}
	
	@RequestMapping("/products/{productId}/productName")
	public String retrieveProductNameeOfProduct(@PathVariable String productId){
		Products product = productService.retrieveProductById(productId);
		if(product == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		return product.getProductName();
	}
	
	@RequestMapping(value="/products",method=RequestMethod.POST)
	public ResponseEntity<Object> addNewProduct(@RequestBody Products product){
		String productId = productService.addNewProduct(product);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{productId}").buildAndExpand(productId).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@RequestMapping(value ="/products/{productId}",method=RequestMethod.DELETE)
	public ResponseEntity<Object> deleteProductById(@PathVariable String productId){
		productService.deleteProductById(productId);		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/products/{productId}", method=RequestMethod.PUT)
	public ResponseEntity<Object> updateProduct(@PathVariable String productId,@RequestBody Products product){
		productService.updateProduct(productId,product);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping("/cart")
	public List<Cart> retrieveAllProductsInCart(){
		return cartService.retrieveAllProductsInCart();
	}
	
	@RequestMapping(value="/cart",method=RequestMethod.POST)
	public ResponseEntity<Object> addNewProductInCart(@RequestBody Cart cart){
		int cartId = cartService.addNewProduct(cart);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cartId}").buildAndExpand(cartId).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@RequestMapping("/cart/{cartId}")
	public Cart retrieveCartProductById(@PathVariable int cartId){
		Cart cartProduct = cartService.retrieveCartProductById(cartId);
		if(cartProduct == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		return cartProduct;
	}	
}
 