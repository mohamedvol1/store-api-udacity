import pool from '../../database';
import { Product, Products } from '../../models/products/product.model';

const productPool = new Products();

describe('Products Model', () => {
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
			product_price: parseFloat(result.product_price as unknown as string),
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
			product_price: parseFloat(result.product_price as unknown as string),
			product_category: result.product_category
		}).toEqual({
			product_id: 1,
			product_name: 'product',
			product_price: 100,
			product_category: 'product'
		});
	});

	afterAll(() => {
		pool.query('ALTER SEQUENCE products_product_id_seq RESTART WITH 1');
		pool.query('DELETE FROM products WHERE product_id=1');
	});
});
