import pool from '../../database';
import { Orders } from '../../models/orders/orders.model';

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const ordersPool = new Orders();

describe('Orders Model', () => {
	beforeAll(() => {
		// make sure user table is empty then add a user to select hisactive orders
		pool.query('DELETE FROM users WHERE user_id=1');
		pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
		pool.query("insert into users (first_name, last_name, user_pass) VALUES ('user', 'user', '12345')");
	});

	it('GET /orders/:id endpoint should respond with 401 status code', async () => {
		const res = await request.get('/users/1');
		expect(res.status).toEqual(401);
	});

	it('should have getUserActiveOrder method', () => {
		expect(ordersPool.getUserActiveOrder).toBeDefined();
	});

	it("getUserActiveOrder should get user's current order", async () => {
		const result = await ordersPool.getUserActiveOrder(1);
		expect(result).toEqual([]);
	});

	afterAll(() => {
		pool.query('DELETE FROM users WHERE user_id=1');
		pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
	});
});
