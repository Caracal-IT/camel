CREATE SCHEMA IF NOT EXISTS camel;

CREATE TABLE IF NOT EXISTS camel.customers (
  id serial PRIMARY KEY,
  first_name VARCHAR (50)  NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  balance DOUBLE PRECISION NOT NULL DEFAULT 0,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO camel.customers (first_name, last_name)
SELECT 'Ettiene', 'Mare'
WHERE NOT EXISTS (SELECT * FROM camel.customers);