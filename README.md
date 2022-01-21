Here is the link the hosted version of 'boardmasters': https://boardmasters.herokuapp.com/api

## PROJECT SUMMARY

This project was set out to implement and demostrate newly learnt back-end development methods of creating an API server using express.js as a framework. The project evolved from creating PSQL databases and using node-postgres to interact with the data and receive client requests and send responses. The project takes the form of a social board game review app whereby users can post reviews of categorised boardgames along with being able to comment on eachothers reviews. To request information from the server follow the link above and add different endpoints to receive specific information, for example: '/api/categories'.

### INSTRUCTIONS FOR CLONING, INSTALLATIONS, AND TESTING

##### Minimum versions of Postgres version 14.1 and Node.js version 17.2.0 need to be installed on your computer to be able to run this project. Instructions for downloading these can be found at: https://www.postgresql.org/download/ and https://nodejs.org/en/download/

#### STEP 1:
Fork this repository to your GitHub.

#### STEP 2: 
Go to your forked repository and click the green 'Code' button and copy the URL provided.

#### STEP 3: 
Go to your computer terminal and enter 'git clone ENTER_URL_HERE'.

#### STEP 4: 
cd into the repository in your terminal and optionally open the repository in a code editor.

#### STEP 5: 
Create two env files within this repository: 1. '.env.development' with 'DBDATABASE=database_name' inside.  

2. '.env.test' with 'DBDATABASE=database_name_test' inside.

#### STEP 6: 
Run the following commmands in your terminal: 'npm install' , 'npm setup-dbs' , 'npm run-seed'.

#### STEP 7: 
You can then run the test file by running 'npm test app' in your terminal.



