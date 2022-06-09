import express from 'express';
import jwt from 'jsonwebtoken';
import { Product, Products } from '../../models/products/product.model';
// import dotenv from 'dotenv';
// dotenv.config()


async function httpCreateNewProduct(req: express.Request, res: express.Response) {
	const product: Product = {
		product_name: req.body.name,
		product_price: req.body.price,
		product_category: req.body.category // should be hashed
	};

	try {
		const productPool = new Products;
		const newProduct = await productPool.createProduct(product);
		return res.json(newProduct);
	} catch (err) {
		throw Error(`Couldn't create a Product: ${err}`);
	}
}

async function httpGetAllProducts(req: express.Request, res: express.Response) {
	try {
		const productPool = new Products;
		const products = await productPool.getAllProducts();
		return res.json(products);
	} catch (err) {
		throw Error(`Couldn't create get products: ${err}`);
	}
}

async function httpGetProductById(req: express.Request, res: express.Response) {
	const id = (req.params.id as unknown) as Number;
	try {
		const productPool = new Products;
		const user = await productPool.getProductById(id);
		return res.json(user);
	} catch (err) {
		throw Error(`Couldn't create get product: ${err}`);
	}
}

export { httpCreateNewProduct, httpGetAllProducts, httpGetProductById };
