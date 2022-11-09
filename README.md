# store-front-api
an APi for a store web app

# SETUP

before you run the app localy you need to do some steps first

## Database Setup

- create a development database 
- create another database for testing
- then to connect to your database just fil the configuration of your databases in .env file as mentioned in ENV setup below.
- to set the app to your database port put assign database port number (default 5432) to `PG_PORT` in .env file 
- assign your database password to `PG_PASSWORD`
- assign your database host to `PG_HOST`
- assign your development database name to `PG_DATABSE`
- assign your testing database name to `PG_DATABSE_TEST`

__Notice:- the app runs on port 5000, if you want to change it change from server.ts and assign wanted port number to `const PORT: Number = <your_port>`__ 

## Env Setup

- add a .env file at your root directory which will be like next.

 \\.env
  	
	PG_HOST=<your_host>  
	PG_USER=<database_user>  
	PG_DATABASE=<database_name_for_dev>  
	PG_DATABASE_TEST=<database_name_for_test>  
	PG_PASSWORD=<database_password>  
	PG_PORT=<database_port>   
	ENV=dev   
	TOKEN_SECRET=<secret_key_for_tokens>    
	SALT_ROUNDS=<number_of_salt_rounds>   
	BCRYPT_PASSWORD=<your_pepper>    

Notice:- PG_DATABASE and PG_DATABASE_TEST are thre name of the databases that you created at the  previous step


- then add database.json file at root directory for migration which will be like this.

Notice! these varaibles from .env file so you dont need to update on the if did the previos steps.

\\database.json

	  {  
		"dev": {  
			"driver": "pg",   
			"user": { "ENV": "PG_USER" },   
			"password": { "ENV": "PG_PASSWORD" },   
			"host": { "ENV": "PG_HOST" },   
			"database": { "ENV": "PG_DATABASE" }   
		},
		"test": {  
			"driver": "pg",   
			"user": { "ENV": "PG_USER" },   
			"password": { "ENV": "PG_PASSWORD" },   
			"host": { "ENV": "PG_HOST" },   
			"database": { "ENV": "PG_DATABASE_TEST" }   
		}
	}

Note:- dev for migrations on development database and test for testing database


## now you are ready to run the app

### `npm install`

### `npm run migrate`
to run the migration on your development database

### `npm run watch`
which will compile the.ts file and run a live form of the server

### `npm run test`
to run the migration on testing database that you created before then run tests suites then reset all the migrations for the next testing
