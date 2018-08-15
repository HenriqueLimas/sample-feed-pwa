CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE name AS (
  first_name text,
  last_name text
);

CREATE TYPE location AS (
  lat bigint,
  lon bigint
);

CREATE TYPE image AS (
  url text,
  description text
);

CREATE TYPE encoding AS (
  encoding text,
  height int,
  width int,
  bit_rates text[]
);

CREATE TABLE users (
  user_id uuid PRIMARY KEY,
  username text,
  name name,
  email text,
  password text
);

CREATE TABLE articles (
  article_id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(user_id),
  date timestamp,
  title text,
  subtitle text,
  content text,
  location location,
  status text,
  type text,
  video_url text,
  video_encoding encoding,
  images image[],
  tags text[]
);

CREATE TABLE article_likes (
  like_id uuid PRIMARY KEY,
  article_id uuid REFERENCES articles(article_id),
  user_id uuid REFERENCES users(user_id)
);

CREATE TABLE article_bookmarks (
  bookmark_id uuid PRIMARY KEY,
  article_id uuid REFERENCES articles(article_id),
  user_id uuid REFERENCES users(user_id)
);

CREATE TABLE article_shares (
  share_id uuid PRIMARY KEY,
  article_id uuid REFERENCES articles(article_id),
  user_id uuid REFERENCES users(user_id)
);

INSERT INTO users(user_id, username, name, email, password)  
     VALUES (uuid_generate_v5(uuid_nil(), 'john_smith'), 'john_smith', ROW('John', 'Smith')::name, 'john.smith@example.com', 'aBdsf4dd2A');

INSERT INTO articles (article_id, user_id, date, title, subtitle, content, images)
     VALUES (uuid_generate_v1(), uuid_generate_v5(uuid_nil(), 'john_smith'), '2018-03-21 10:42:54', 'Murder on downtown', 'Yesterday downtown had a murder', 'Yesterday downtown had a murder', ARRAY[ROW('https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png', 'Picture of the person who died')]::image[]);