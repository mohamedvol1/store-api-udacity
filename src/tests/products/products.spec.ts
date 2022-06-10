import pool from '../../database';
import { Product, Products } from '../../models/products/product.model';

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

const productPool = new Products();

describe('Products Model', () => {
	// endpoint testing
	it('GET /products endpoint should respond with empty list', async () => {
		const res = await request.get('/products');
		expect(res.body).toEqual([]);
	});

	it("POST /products endpoint should respond with 'invalid token' message", async () => {
		const res = await request
			.post('/products')
			.send({
				name: 'product',
				price: 100,
				category: 'furniture'
			})
			.set('Accept', 'application/json');
		expect(res.body).toEqual('invalid token');

		// reseting products table
		pool.query('DELETE FROM products WHERE product_id=1');
		pool.query('ALTER SEQUENCE products_product_id_seq RESTART WITH 1');
	});

	it('GET /products/:id endpoint should respond with 401 status code', async () => {
		const res = await request.get('/users/1');
		expect(res.status).toEqual(401);
	});

	it('should have an getAllProducts method', () => {
		expect(productPool.getAllProducts).toBeDefined();
	});

	it('should have createProduct method', () => {
		expect(productPool.createProduct).toBeDefined();
	});

	it('should have getProductById method', () => {
		expect(productPool.getProductById).toBeDefined();
	});

	it('createProduct method should add a product', async () => {
		const product: Product = {
			product_name: 'product',
			product_price: 100,
			product_category: 'product'
		};
		const result: Product = await productPool.createProduct(product);
		expect({
			product_id: result.product_id,
			product_name: result.product_name,
			product_price: parseFloat((result.product_price as unknown) as string),
			product_category: result.product_category
		}).toEqual({
			product_id: 1,
			product_name: 'product',
			product_price: 100,
			product_category: 'product'
		});
	});

	it('getAllProducts method should retrun all products', async () => {
		const result = await productPool.getAllProducts();
		// user from the previous spec
		expect(result.length).toEqual(1);
	});

	it('getProductById method should retrun a product by the id', async () => {
		const result = await productPool.getProductById(1);
		// user from the previous spec
		expect({
			product_id: result.product_id,
			product_name: result.product_name,
			product_price: parseFloat((result.product_price as unknown) as string),
			product_category: result.product_category
		}).toEqual({
			product_id: 1,
			product_name: 'product',
			product_price: 100,
			product_category: 'product'
		});
	});

	afterAll(() => {
		pool.query('DELETE FROM products WHERE product_id=1');
		pool.query('ALTER SEQUENCE products_product_id_seq RESTART WITH 1');
	});
});
