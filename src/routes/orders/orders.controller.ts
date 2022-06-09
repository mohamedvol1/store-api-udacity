import express from 'express';
import { Orders } from '../../models/orders/orders.model';

async function httpGetCurrentOrderById(req: express.Request, res: express.Response) {
  const id = (req.params.id as unknown) as Number;
	try {
		const orderPool = new Orders();
		const order = await orderPool.getUserActiveOrder(id);
		return res.json(order);
	} catch (err) {
		throw Error(`Couldn't get order: ${err}`);
	}
}

export { httpGetCurrentOrderById }