DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT (10) PRIMARY KEY AUTO_INCREMENTNOT NOT NULL,
  product_name VARCHAR (45) NOT NULL,
  department_name VARCHAR (45) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT (10) NOT NULL
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nintendo switch", "electronics", 299.99, 13),
        ("robot", "electronics", 549.99, 5),
        ("jacket", "clothes", 14.99, 17),
        ("socks","clothes", 23.99, 12),
        ("trash bags", "home", 4.99, 25),
        ("dish soap", "home", 24.99, 15),
        ("laser pointer", "office", 5.99, 30),
        ("chair", "office", 1.99, 35),
        ("chia seeds", "food", 7.99, 9),
        ("bread", "food", 3.99, 23)

        Select * FROM products;