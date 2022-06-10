import jwt, { Jwt } from 'jsonwebtoken';
import { User, Users } from '../models/users/user.models';

function createTestToken(): string {
	const user: User = {
		first_name: 'user',
		last_name: 'user',
		user_pass: '1234'
	};

	try {
		const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
		return token;
	} catch (err) {
		throw Error(`Couldn't create a token: ${err}`);
	}
}

export default createTestToken;
