import express, { Request, Response } from 'express';

import pool from './database';
import { Users } from './models/users/user.models';
import { Products } from './models/products/product.model';
import usersRoute from './routes/users/users.route';
import productsRoute from './routes/porducts/products.route';
import ordersRoute from './routes/orders/oreders.route';

const app: express.Application = express();
const PORT: number = 5000;

app.use(express.json());
app.use(usersRoute);
app.use(productsRoute);
app.use(ordersRoute);

app.get('/', function(req: Request, res: Response) {
	res.send('Hello World!');
});

// const products = new Products;
// products.createProduct({ name: 'chair', price: 120, category: "furniture" }).then(data => console.log('>>>>>>>>>>>>>>>>>>>>', data))

app.listen(PORT, function() {
	console.log(`starting app on: ${PORT}`);
});

export default app;
