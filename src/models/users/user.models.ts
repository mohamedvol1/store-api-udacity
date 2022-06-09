import bcrypt from 'bcrypt';

import pool from '../../database';

export type User = {
	user_id?: Number;
	first_name: string;
	last_name: string;
  user_pass: string;
};

export class Users {
	async getAllUsers(): Promise<User[]> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT user_id, first_name, last_name FROM users';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get users: ${err}`);
		}
	}

  async getUserById(id: Number): Promise<User> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM users WHERE user_id = $1';
      const values = [id]
			const result = await conn.query(sql, values);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get user: ${err}`);
		}    
  }

  async createUser(user: User): Promise<User> {
		try {
			const conn = await pool.connect();
			const sql = "insert into users (first_name, last_name, user_pass) VALUES ($1, $2, $3) RETURNING *"

			// hashing user password
			const pepper = process.env.BCRYPT_PASSWORD
			const hash = bcrypt.hashSync(user.user_pass + pepper, parseInt(process.env.SALT_ROUNDS as string))

      const values = [user.first_name, user.last_name, hash]
			const result = await conn.query(sql, values);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot create a user: ${err}`);
		}    
  }
}
