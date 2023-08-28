package com.springboot.restapi.springbootrestapi.products;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class ProductService {

	private static List<Products> allProducts = new ArrayList<>();
	
	static {
		Products p1 = new Products("1","Red Printed T-Shirt", "../assets/product-1.jpg", "2,500.00");
		Products p2 = new Products("2","Casual Shoes", "../assets/product-2.jpg", "1,200.00");
		Products p3 = new Products("3","Track Pant", "../assets/product-3.jpg", "1,700.00");
		Products p4 = new Products("4","Casual Shirt", "../assets/product-4.jpg", "2,900.00");
		Products p5 = new Products("5","White Sneakers", "../assets/product-5.jpg", "3,500.00");
		Products p6 = new Products("6","Black plain T-Shirts", "../assets/product-6.jpg", "500.00");
		Products p7 = new Products("7","Socks", "../assets/product-7.jpg", "200.00");
		Products p8 = new Products("8","Analog Watch", "../assets/product-8.jpg", "1,900.00");
		Products p9 = new Products("9","Digital Watch", "../assets/product-9.jpg", "2,100.00");
		Products p10 = new Products("10","Black Sneakers", "../assets/product-10.jpg", "7,500.00");
		Products p11 = new Products("11","White shoes", "../assets/product-11.jpg", "1,500.00");
		Products p12 = new Products("12","Sports pants", "../assets/product-12.jpg", "800.00");
		
		allProducts.add(p1);
		allProducts.add(p2);
		allProducts.add(p3);
		allProducts.add(p4);
		allProducts.add(p5);
		allProducts.add(p6);
		allProducts.add(p7);
		allProducts.add(p8);
		allProducts.add(p9);
		allProducts.add(p10);
		allProducts.add(p11);
		allProducts.add(p12);
		
	}

	public List<Products> retrieveAllProducts() {
		return allProducts;
	}

	public Products retrieveProductById(String productId) {
		Predicate<? super Products> predicate = product -> product.getId().equalsIgnoreCase(productId);
		Optional<Products> optionalSurvey = allProducts.stream().filter(predicate).findFirst();
		if(optionalSurvey.isEmpty()) return null;
		return optionalSurvey.get();
	}

	public String addNewProduct(Products product) {
		allProducts.add(product);	
		return product.getId();
	}

	public String deleteProductById(String productId) {
		if(allProducts == null) return null;
		Predicate<? super Products> predicate = product -> product.getId().equalsIgnoreCase(productId);
		boolean removed = allProducts.removeIf(predicate);	
		if(!removed) return null;
		return productId;
	}
	
	public void updateProduct(String productId, Products product) {
		allProducts.removeIf(p -> p.getId().equalsIgnoreCase(productId));
		allProducts.add(product);		
	}
}

