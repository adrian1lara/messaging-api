# Messaging-API


Messaging-API is a RESTful API for chatty my chat web app.

## Getting Started

These instructions will guide you through setting up the messaging API project:


1. Prerequisites:
 * Ensure you have Node.js and npm (or yarn). If not installed download them from the official Node.js website [ https://nodejs.org/en]( https://nodejs.org/en)

2. Installation
* Clone this repository using Git:
```
Bash

git clone https://github.com/adrian1lara/messaging-api.git
```
* Navigate to the project directory:
```
Bash

cd messaging-api
```

* Install the project's dependencies:

```
Bash

npm install # or yarn install
```


3. Running the API

* Start the development server:

```
Bash

npm run dev # or yarn dev
```

## API Reference
Base URL: http://localhost:3000/api/v0

### Authentication:

Token-based authentication using a custom authenticate middleware.
Specific endpoints require administrative privileges, enforced by an isAdmin middleware.
Endpoints:

#### Users:

* GET /user/all
    - Purpose: Retrieve a list of all users.
    - Authentication: None
* GET /user/search/username
   - Purpose: Search for users by username.
   - Authentication: None
* GET /user/auth/me
  - Purpose: Get information about the currently authenticated user.
  - Authentication: Required
* POST /user/new
  - Purpose: Create a new user account.
  - Authentication: None
* POST /user/auth/login
  - Purpose: Login a user and obtain an authentication token.
  - Authentication: None
* DELETE /user/auth/delete/:userId
  - Purpose: Delete a user account (requires administrative privileges).
  - Authentication: Required
  - Administrative privileges: Required
* DELETE /user/auth/account/delete/:userId
  - Purpose: Delete the currently authenticated user's account.
  - Authentication: Required
#### Chats:

* GET /chat/all
  - Purpose: Retrieve a list of all chats.
  - Authentication: None
* GET /chat/:userId/chats
  - Purpose: Retrieve a list of chats for a specific user.
  - Authentication: Required
* GET /chat/user
  - Purpose: Retrieve a list of chats for the currently authenticated user.
  - Authentication: Required
* POST /chat/new
  - Purpose: Create a new chat.
  - Authentication: Required
* DELETE /chat/delete/all
  - Purpose: Delete all chats (requires administrative privileges).
  - Authentication: Required
  - Administrative privileges: Required
#### Messages:

* GET /message/all
    - Purpose: Retrieve a list of all messages.
  - Authentication: None
* GET /message/:chatId/messages
  - Purpose: Retrieve a list of messages within a specific chat.
  - Authentication: Required
* POST /message/:chatId/new
  - Purpose: Send a new message within a specific chat.
  - Authentication: Required
* DELETE /message/delete/all
  - Purpose: Delete all messages (requires administrative privileges).
  - Authentication: Required
  - Administrative privileges: Required

#### Socket.io:

The server employs Socket.io for real-time communication.
Events:
connection: Triggered when a user connects.
message: Triggered when a client emits a message.
disconnect: Triggered when a user disconnects.
Error Handling:

Custom Error handling for 404 (Not Found) and generic errors.
Errors are returned as JSON objects with a name and message property.



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)