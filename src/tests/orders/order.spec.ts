import pool from '../../database';
import { Orders } from '../../models/orders/orders.model';

const ordersPool = new Orders();



describe('Orders Model', () => {

  beforeAll(() => {
		pool.query('DELETE FROM users WHERE user_id=1');
    pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
    pool.query("insert into users (first_name, last_name, user_pass) VALUES ('user', 'user', '12345')")
  })
  it('should have getUserActiveOrder method', () => {
    expect(ordersPool.getUserActiveOrder).toBeDefined()
  })

  it("getUserActiveOrder should get user's current order", async () => {
    const result = await ordersPool.getUserActiveOrder(1)
    expect(result).toEqual([])
  })

  afterAll(() => {
    pool.query('DELETE FROM users WHERE user_id=1');
    pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
  })
})
