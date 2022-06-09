/* Replace with your SQL commands */

create table orders_products(
 orders_products_id SERIAL PRIMARY KEY,
 order_id integer REFERENCES orders(order_id),
 product_id integer REFERENCES products(product_id),
 quantity integer
)
