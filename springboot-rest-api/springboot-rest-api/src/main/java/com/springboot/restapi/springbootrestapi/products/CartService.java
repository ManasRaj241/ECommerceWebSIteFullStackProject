package com.springboot.restapi.springbootrestapi.products;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class CartService {

	private static List<Cart> allProductsInCart = new ArrayList<>();
	
	public List<Cart> retrieveAllProductsInCart() {
		return allProductsInCart;
	}
	
	public int addNewProduct(Cart cart) {
		allProductsInCart.add(cart);	
		return cart.getId();
	}
	
	public Cart retrieveCartProductById(int cartId) {
		Predicate<? super Cart> predicate = cart -> cart.getId() == cartId;
		Optional<Cart> optionalCart = allProductsInCart.stream().filter(predicate).findFirst();
		if(optionalCart.isEmpty()) return null;
		return optionalCart.get();
	}
}
