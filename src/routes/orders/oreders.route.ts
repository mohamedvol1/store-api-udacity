import express from 'express';
import verifyAuthToken from '../../middleware/verifyAuthToken';
import { httpGetCurrentOrderById } from './orders.controller';

const ordersRoute = express.Router();

ordersRoute.get('/current_order/:id',verifyAuthToken, httpGetCurrentOrderById);

export default ordersRoute;
