DROP DATABASE IF EXISTS documents;
CREATE DATABASE documents;

\c documents;

CREATE TABLE docs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  text VARCHAR
);

INSERT INTO docs (title, text)
  VALUES ('Document example', 'First example of document');

