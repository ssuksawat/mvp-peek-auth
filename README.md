# Peek Authentication API

Peek is a token-based authentication API. 


Features:
- Users can sign up for an account with Peek and use Peek to log into any authorized providers
- Clients/providers can register to use Peek API
- A 4-digit sign-in token, "Peek Code", will be generated and sent to user through text-message
- Upon successful user log-in, an access-token will be generated for that user & provider

<br>

## API v.1

Clients API <br>
`POST  /v1/clients` - Create new client

Users API <br>
`POST  /v1/users` - Create new user

Auth API <br>
`GET   /v1/auth` - Redirect to Peek login page <br>
`POST  /v1/login?client_id=<CLIENT ID>` - Generate Peek code to log user in to client app <br>
`POST  /v1/login/:username` - Authenticate user and redirect back to client's redirect url <br>
`GET   /v1/token?access_token=<ACCESS TOKEN>` - Verify access token, will refresh expiration on successful verification <br>

<br>

## How to run
```
npm install
npm start
```
