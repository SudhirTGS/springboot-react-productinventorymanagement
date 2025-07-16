package com.learn.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Model class for Product in inventory management
@Entity
@Table(name = "productinfo") // <-- specify your table name here
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private String productDescription;
    private int productPrice;
    private int productQuantity;

    // No-arg constructor required by JPA
    public Product() {
    }

    // Constructor
    public Product(int productId, String productName, String productDescription, int productPrice, int productQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }
    // Getters and Setters
    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    //getter and setter for productDescription and productPrice and productQuantity
    public String getProductDescription() {
        return productDescription;
    }   
    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }
    public int getProductPrice() {
        return productPrice;
    }


    public void setProductPrice(int productPrice) {
        this.productPrice = productPrice;
    }
    public int getProductQuantity() {
        return productQuantity;
    }


    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }



}
