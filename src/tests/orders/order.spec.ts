import pool from '../../database';
import { Orders } from '../../models/orders/orders.model';

import supertest from 'supertest';
import app from '../../server';
import createTestToken from '../test_token';

const request = supertest(app);
const ordersPool = new Orders();

const token = createTestToken();

describe('Orders Model', () => {	
	it('GET /orders/:id endpoint should respond with 401 status code', async () => {
		console.log('here >>>>>>>>>>>>>>>', token)
		const res = await request.get('/current_order/1').set('Authorization', 'bearer ' + token);
		expect(res.status).toEqual(200);
	});

	it('should have getUserActiveOrder method', () => {
		expect(ordersPool.getUserActiveOrder).toBeDefined();
	});

	it("getUserActiveOrder should get user's current order", async () => {
		const result = await ordersPool.getUserActiveOrder(1);
		expect(result).toEqual([]);
	});

});
