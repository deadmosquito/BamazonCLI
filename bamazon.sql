DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (345, "nintendo switch", "electronics", 299.99, 13),
        (896, "robot", "electronics", 549.99, 5),
        (190, "jacket", "clothes", 14.99, 17),
        (081, "socks","clothes", 23.99, 12),
        (237, "trash bags", "home", 4.99, 25),
        (932, "dish soap", "home", 24.99, 15),
        (874, "stylus", "office", 5.99, 30),
        (409, "chair", "office", 1.99, 35),
        (777, "chia seeds", "food", 7.99, 9),
        (390, "bread", "food", 3.99, 23)