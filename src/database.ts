import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const DEV_CONFIG = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: parseInt(process.env.PG_PORT as string)
};

const TEST_CONFIG = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE_TEST,
	password: process.env.PG_PASSWORD,
	port: parseInt(process.env.PG_PORT as string)
};

const pool = process.env.ENV === 'dev' ? new Pool({ ...DEV_CONFIG }) : new Pool({ ...TEST_CONFIG });

export default pool;
