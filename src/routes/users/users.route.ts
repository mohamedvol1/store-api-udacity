import express from 'express';
import verifyAuthToken from '../../middleware/verifyAuthToken';
import { httpCreateNewUser, httpGetUserById, httpGetUsers } from './users.controller';

const usersRoute = express.Router();

usersRoute.post('/users',httpCreateNewUser);
usersRoute.get('/users', verifyAuthToken, httpGetUsers);
usersRoute.get('/users/:id', verifyAuthToken, httpGetUserById);

export default usersRoute;
