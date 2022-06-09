# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index productsRoute.get('/products', httpGetAllProducts); 
- Show productsRoute.get('/products/:id', httpGetProductById);
- Create [token required] productsRoute.post('/products', verifyAuthToken, httpCreateNewProduct)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] usersRoute.get('/users', httpGetUsers);
- Show [token required] usersRoute.get('/users/:id', verifyAuthToken, httpGetUserById);
- Create N[token required] usersRoute.post('/users',verifyAuthToken, httpCreateNewUser);

#### Orders
- Current Order by user (args: user id)[token required] ordersRoute.get('/current_order/:id',verifyAuthToken, httpGetCurrentOrderById);

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id  => product_id: Number
- name => product_name: string
- price => product_price
- [OPTIONAL] category => product_category: string

#### User
- id   =>  user_id: Number
- firstName  =>  first_name: string
- lastName   =>  last_name: string
- password   =>  user_pass: string  (hash)

#### Orders 
split it to two tables
### Orders
- id    =>  id: Number
- status of order (active or complete)  =>  order_status: string
- user_id  =>  user_id: Number

and

### orders_products
- id   =>  id: Number
- order_id   =>   order_id: order_id
- product_id =>   product_id
- quantity   =>   quantity

