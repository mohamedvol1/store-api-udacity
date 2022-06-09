import pool from "../../database";

export type Order = {
  id?: Number;
  order_status: string;
  user_id: Number;
}

export class Orders {
 async getUserActiveOrder(id: Number): Promise<Order[]> {
  try {
    const conn = await pool.connect();
    const sql = "select order_id, order_status, orders.user_id from users INNER JOIN orders ON orders.user_id = users.user_id and orders.user_id = $1 and order_status = 'active';";
    const values = [id]
    const result = await conn.query(sql, values);
    conn.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Cannot get Orders: ${err}`);
  }    
 }
}