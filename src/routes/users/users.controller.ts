import express from 'express';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config()

import { User, Users } from '../../models/users/user.models';

async function httpCreateNewUser(req: express.Request, res: express.Response) {
	const user: User = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_pass: req.body.password // should be hashed
	};

	try {
		const userPool = new Users();
		const newUser = await userPool.createUser(user);
		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
		return res.json(token);
	} catch (err) {
		throw Error(`Couldn't create a user: ${err}`);
	}
}

async function httpGetUsers(req: express.Request, res: express.Response) {
	try {
		const userPool = new Users();
		const users = await userPool.getAllUsers();
		return res.json(users);
	} catch (err) {
		throw Error(`Couldn't create get users: ${err}`);
	}
}

async function httpGetUserById(req: express.Request, res: express.Response) {
	const id = (req.params.id as unknown) as Number;
	try {
		const userPool = new Users();
		const user = await userPool.getUserById(id);
		return res.json(user);
	} catch (err) {
		throw Error(`Couldn't create get users: ${err}`);
	}
}

export { httpCreateNewUser, httpGetUsers, httpGetUserById };
