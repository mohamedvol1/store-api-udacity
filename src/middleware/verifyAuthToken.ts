import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

async function verifyAuthToken(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const authHeader = (req.headers.authorization as unknown) as string;
		const token = (authHeader.split(' ')[1] as unknown) as string;
		const resolved = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;

		next();
	} catch (error) {
		res.status(401).json(`invalid token`);
	}
}

export default verifyAuthToken;
