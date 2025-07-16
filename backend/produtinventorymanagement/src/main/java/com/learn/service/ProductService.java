package com.learn.service;

import com.learn.model.Product;
import com.learn.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(int productId) {
        return productRepository.findById(productId);
    }

    public void deleteProduct(int productId) {
        productRepository.deleteById(productId);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
