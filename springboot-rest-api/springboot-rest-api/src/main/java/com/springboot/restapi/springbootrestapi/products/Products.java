package com.springboot.restapi.springbootrestapi.products;

public class Products {

	public Products() {
		
	}
	
	private String id;
	private String productName;
	private String imagePath;
	private String price;
	
	public Products(String id, String productName, String imagePath, String price) {
		super();
		this.id = id;
		this.productName = productName;
		this.imagePath = imagePath;
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Products [id=" + id + ", productName=" + productName + ", imagePath=" + imagePath + ", price=" + price
				+ "]";
	}
	
	
	
}

