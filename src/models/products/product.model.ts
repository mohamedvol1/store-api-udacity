import pool from "../../database";

export type Product = {
  product_id?: Number;
  product_name: string;
  product_price: Number;
  product_category: string;
}

export class Products {
  async getAllProducts(): Promise<Product[]> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get products: ${err}`);
		}
	}

  async getProductById(id: Number): Promise<Product> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM products WHERE product_id = $1';
      const values = [id]
			const result = await conn.query(sql, values);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get product: ${err}`);
		}    
  }

  async createProduct(product: Product): Promise<Product> {
		try {
			const conn = await pool.connect();
			const sql = "insert into products (product_name, product_price, product_category) VALUES ($1, $2, $3) RETURNING *"
      const values = [product.product_name, product.product_price, product.product_category]
			const result = await conn.query(sql, values);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot create a product: ${err}`);
		}    
  }
}