import express from 'express';
import verifyAuthToken from '../../middleware/verifyAuthToken';
import { httpCreateNewProduct, httpGetAllProducts, httpGetProductById } from './products.controller';

const productsRoute = express.Router();

productsRoute.post('/products', verifyAuthToken, httpCreateNewProduct);
productsRoute.get('/products', httpGetAllProducts);
productsRoute.get('/products/:id', httpGetProductById);

export default productsRoute;
