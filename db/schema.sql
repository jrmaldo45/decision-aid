DROP DATABASE IF EXISTS mvp;
CREATE DATABASE mvp;

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL
);

INSERT INTO categories (category_name) VALUES ('none');

DROP TABLE IF EXISTS games;
CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category_id INT REFERENCES categories(id) DEFAULT 1,
  favorite BOOLEAN NOT NULL DEFAULT false
);
