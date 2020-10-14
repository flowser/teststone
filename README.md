## This is A test given by Stone Age Technologies, the Query is:
Problem Statement:
Company A is an order processing firm, which was doing operations manually so far, and now they want an order processing system and perform all their tasks through a web application. 

They receive orders in a CSV file format (attached), you have to create relational tables for corresponding records in the CSV file and then create CRUD operations for Orders. This should consist of following key elements:
- Pagination
- Design using Bootstrap 4
- Object-Oriented Model Classes
- Parameterized Queries
- Performance, as these CSVs can contain thousands of records

My Answer will be based on laravel 7, laravel passport, Fullstack Frontend Backend system Bootstrap 4, vuejs, vuerouter, vuex. The following steps are my Environment and variables setup, I use Laragon as my local Apache and Mysql Server. Follow the next steps as detailed below:  
- git clone the project.
- composer install.
- npm install- npm run production
- cp .env.example .env .
- fillup your PASSPORT_LOGIN_ENDPOINT="http://{your url}/oauth/token" at the ENV file.
- Create an empty database for our application.
- In the .env file, add database information to allow Laravel to connect to the database and run the following commands in the root base of the application.
- php artisan key:generate
- php artisan migrate --seed
- php artisan passport:install
- open the app using the htt://{your url} set initially in the ENV file, you will get the Landing page with navigation bar, hit the login, and login using the following credentials.
- Username: felixnyachio@gmail.com
- password: flx4life

# teststone
# teststone
