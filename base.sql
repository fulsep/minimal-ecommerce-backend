CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR (80) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE flash_sale (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  startAt TIMESTAMP NOT NULL,
  endAt TIMESTAMP NOT NULL
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  userId INT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  avatar VARCHAR (80) DEFAULT NULL,
  name VARCHAR (80) NOT NULL,
  balance INT DEFAULT 0 NOT NULL,
  email VARCHAR (80) NOT NULL,
  password VARCHAR (60) NOT NULL
);

CREATE TABLE forgot_request (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  isUsed BOOLEAN DEFAULT FALSE NOT NULL,
  userId INT NOT NULL
);

CREATE TABLE user_addresses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat VARCHAR (10),
  lng VARCHAR (10),
  isPrimary BOOLEAN DEFAULT FALSE NOT NULL
  userId INT NOT NULL
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invCode VARCHAR (40) NOT NULL,
  userId INT NOT NULL,
  shippingAddress TEXT NOT NULL,
  transactionDate TIMESTAMP NOT NULL
);

CREATE TABLE invoice_items (
  id SERIAL PRIMARY KEY,
  invoiceId INT NOT NULL,
  name VARCHAR (80) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL
);