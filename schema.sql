DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_ name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,4),
  stock_quantity INT(100),
  PRIMARY KEY (item_id)
);

SELECT * FROM products;


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (20, "Fire TV Stick", "entertainment", 49.99, 95);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (21, "Yoga Mat", "sports & fitness", 28.99, 84);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (23, "The Sopranos: The Complete Series", "entertainment", 73.49, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (28, "Dog Kong", "pet supplies", 7.99, 56);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (32, "Carson Wentz Jersey", "sports & fitness", 129.95, 19);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (36, "Earth Rated Dog Waste Bags", "pet supplies", 11.99, 89);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (44, "Becoming Michelle Obama", "books", 30.99, 74);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (46, "Ski Goggles", "sports & fitness", 63.99, 81);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (52, "Beats Studio Headphones", "electronics", 239.99, 95);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (57, "Shady Rays", "sunglasses", 44.99, 71);