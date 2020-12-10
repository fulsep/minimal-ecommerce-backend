# BACKEND APP WITH NODE AND POSTGRESQL

## API SPECS
- POST `/api/v1/login`
- POST `/api/v1/register`
- POST `/api/v1/forgotPassword`
- POST `/api/v1/forgotPassword/:code`
- GET `/api/v1/flashSale`
- GET `/api/v1/products`
- GET `/api/v1/products/:productId`
- GET/PATCH `/api/v1/profile`
- GET `/api/v1/cart/:itemId`
- PATCH/DELETE `/api/v1/cart/:itemId`
- GET `/api/v1/checkout`
- POST `/api/v1/payment/:invoiceId`

## Requirements
- NodeJS v12 LTS
- PostgreSQL v10 LTS

## How To Run This App

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your Postgres credentials
- Open your terminal in this project and run 
  ```
  npm i
  ```
- And then
  ```
  npx nodemon
  ```