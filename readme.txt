1. Download the LTS version of node.js from https://nodejs.org/en/
2. Open a command line and navigate to the folder ...\SMAS\SMAS-System (eg. CD C:\Users\Name\Documents\GitHub\SMAS\SMAS-System)
3. Once in this folder on the command line, copy the following list of commands:
	npm i
	npm i dotenv
	npm i tedious
	npm i sequelize
	npm i express-validator
	npm i pug
4. Copy this command into the command line: 
	SET DEBUG=SMAS-System:* & npm start
5. You should now be able to access the website by going to localhost:3000 in your web browser
6. If you want to run tests locally, enter the command npm run ci