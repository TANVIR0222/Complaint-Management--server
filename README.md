# Express.js Node.js Project

## Overview
This is a Node.js project built with Express.js and includes various dependencies for security, authentication, and logging.

## Technologies Used
- **Express** (v4.21.2) - Fast and minimalist web framework
- **Mongoose** (v8.10.0) - MongoDB object modeling for Node.js
- **BcryptJS** (v2.4.3) - Password hashing utility
- **JSON Web Token (JWT)** (v9.0.2) - Secure authentication and authorization
- **Cookie Parser** (v1.4.7) - Middleware for parsing cookies
- **Helmet** (v8.0.0) - Security middleware for HTTP headers
- **Morgan** (v1.10.0) - HTTP request logger

## Installation


1. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Project
To start the server:
```sh
npm install && nodemon index.js
# or
yarn start
```
The application will run at `http://localhost:8080` (default port).

## Folder Structure
```
.
├── src
│   ├── controllers  # Route controllers
│   ├── middlewares  # Middleware functions
│   ├── models       # Mongoose models
│   ├── routes       # Express routes
│   ├── utils       # Configuration files
│   ├── app.js       # Express app setup
│   ├── server.js    # Server entry point
│
├── README.md       # Documentation
```

## Usage
- Define API routes in `src/routes`.
- Implement controllers in `src/controllers`.
- Use `mongoose` for database interactions.
- Secure routes with `jsonwebtoken`.


## License
This project is licensed under the MIT License.

