/* Replace with your SQL commands */

create table orders(
  order_id SERIAL PRIMARY KEY,
  order_status VARCHAR(100),
  user_id integer REFERENCES users(user_id)
)