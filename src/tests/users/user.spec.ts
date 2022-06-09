import { User, Users } from '../../models/users/user.models';

import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../database';

const userPool = new Users();

describe('Users Model', () => {
	beforeAll(() => {
		pool.query('DELETE FROM users WHERE user_id=1');
		pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
	});

	it('should have an getAllUsers method', () => {
		expect(userPool.getAllUsers).toBeDefined();
	});

	it('should have createUser method', () => {
		expect(userPool.createUser).toBeDefined();
	});

	it('should have getUserById method', () => {
		expect(userPool.getUserById).toBeDefined();
	});

	it('createUser method should add a user', async () => {
		const user: User = {
			first_name: 'user',
			last_name: 'user',
			user_pass: '1234'
		};
		const result = await userPool.createUser(user);
		// comparing user_pass with password hash returned from result
		const pass_digest = result.user_pass;
		const pepper = process.env.BCRYPT_PASSWORD;
		const resolved = bcrypt.compareSync(user.user_pass + pepper, pass_digest);
		expect({ user_id: 1, first_name: result.first_name, last_name: result.last_name }).toEqual({
			user_id: 1,
			first_name: user.first_name,
			last_name: user.last_name
		});
		expect(resolved).toBeTruthy();
	});

	it('getAllUsers method should retrun all users', async () => {
		const result = await userPool.getAllUsers();
		// user from the previous spec
		expect(result.length).toEqual(1);
	});

	it('getUserById method should retrun a user by the id', async () => {
		const user = await userPool.getUserById(1);
		// user from the previous spec
		expect({
			user_id: user.user_id,
			first_name: user.first_name,
			last_name: user.last_name
		}).toEqual({
			user_id: 1,
			first_name: 'user',
			last_name: 'user'
		});
	});
	afterAll(() => {
		pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
		pool.query('DELETE FROM users WHERE user_id=1');
	});
});
