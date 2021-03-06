# redink-blog-api
Content Management System API

## Live API link:
To be added later via heroku docker deploy

## Easiest way to setup and run if you have docker installed:
```bash
  docker-compose up -d
```

## Manual setup:
### Install required node modules
```bash
  npm install
```

### Database setup
#### Create database user and database
- Create a new database user set mysql authentication type to 'Native MySQL authentication'
- Create a new database and give all permissions to the previously created user
#### Import dummy database dump
```bash
  mysql -u <user_name> -p <database_name> < ./schemas/dummy.sql
```

### Test mail server setup
> **Plaease follow the guide: [https://kinsta.com/blog/mailhog/](https://kinsta.com/blog/mailhog/ "How to Use MailHog to Test Emails Locally (Step-by-Step Guide)")**


### Environment variables setup
- Create a file named .env and edit it
```bash
  touch .env
  nano .env
```
- Put the following contents to the file and save it
```bash
  # Database server connection details
  DB_HOST=localhost
  DB_PORT=3306
  DB_TYPE=mysql
  DB_USER=<user_name>
  DB_PASS=<database_password>
  DB_DBASE=<database_name>

  # Mail server connection details
  MAIL_HOST=<mail_server_smtp_host>
  MAIL_PORT=25
  MAIL_SENDER_ADDRESS=<mail_address>
  MAIL_SENDER_NAME=<mail_sender_display_name>
  MAIL_USER=<mail_address>
  MAIL_PASS=<mail_password>

  # Mail server connection optional TLS details (0 = false, 1 = true)
  # Enables or Disables TLS support (default: disabled)
  MAIL_SECURE=0
  # Enables or Disables START_TLS mode (default: disabled)
  MAIL_START_TLS=0
  # Enables or Disables self signed or invalid certificates (default: disabled)
  MAIL_STRICT_TLS=0

  # JWT secrets
  JWT_ACCESS_TOKEN_SECRET=<access_secret_key>
  JWT_REFRESH_TOKEN_SECRET=<refresh_secret_key>
```

## How to run the code?
### First, start the server
```bash
  npm start
```

### Test REST APIs
- Import Postman REST API test project to Postman from:
```bash
  ./tests/redink-blog-api.postman_collection.json
```
- Now you are ready to test the API from Postman
- All the required API keys and test parameters are with in the Postman project
- If required to check user authentication then use credentials given below:
```json
{
    "username": "admin",
    "password": "admin@123"
}
```

### Test email notification functionality
- Open MailHog from any web browser: **[http://localhost:8025](http://localhost:8025 "MailHog at localhost")**
- Add a new post or update an existing post from postman collection
- Watch Mailhog dashboard already opened up on the browser

Now you will receive email notifications like below

![MailHogDashboard](/assets/images/MailHogDashboard.png)

## Database Schema Design:
Here is a relationship diagram of various database tables:

![DBRelationshipDiagram](/assets/images/DBRelationshipDiagram.png)

