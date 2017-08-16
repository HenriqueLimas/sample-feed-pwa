DROP KEYSPACE IF EXISTS news_in_city;

CREATE KEYSPACE news_in_city WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

USE news_in_city;

CREATE TYPE name (
  first_name text,
  last_name text
);

CREATE TYPE location (
  lat bigint,
  lon bigint
);

CREATE TYPE image (
  url text,
  description text
);

CREATE TYPE encoding (
  encoding text,
  height int,
  width int,
  bit_rates Set<text>
);

CREATE TABLE users (
  user_id timeuuid,
  username text,
  name frozen<name>,
  email text,
  password text,
  PRIMARY KEY (user_id)
);

CREATE TABLE users_by_username (
  username text,
  user_id timeuuid,
  name frozen<name>,
  email text,
  password text,
  PRIMARY KEY (username)
);

CREATE TABLE users_by_email_password (
  email text,
  password text,
  user_id timeuuid,
  username text,
  name frozen<name>,
  PRIMARY KEY (email, password)
);

CREATE TABLE contributors_by_article (
  article_id timeuuid,
  user_id timeuuid,
  username text,
  email text,
  title text,
  subtitle text,
  content text,
  images Set<frozen<image>>,
  video_url text,
  location frozen<location>,
  status text,
  PRIMARY KEY ((article_id), user_id)
);

CREATE TABLE contributors_by_user (
  user_id timeuuid,
  article_id timeuuid,
  username text,
  email text,
  title text,
  subtitle text,
  content text,
  images Set<frozen<image>>,
  video_url text,
  location frozen<location>,
  status text,
  PRIMARY KEY ((user_id), article_id)
);

CREATE TABLE articles (
  article_id timeuuid,
  user_id timeuuid,
  date timestamp,
  title text,
  subtitle text,
  content text,
  location frozen<location>,
  status text,
  type text,
  video_url text,
  video_encoding frozen<encoding>,
  images Set<frozen<image>>,
  tags Set<text>,
  PRIMARY KEY ((user_id), article_id)
);

CREATE TABLE articles_by_user (
  user_id timeuuid,
  article_id timeuuid,
  username text,
  date timestamp,
  title text,
  subtitle text,
  content text,
  status text,
  type text,
  video_url text,
  video_encoding frozen<encoding>,
  images Set<frozen<image>>,
  tags Set<text>,
  PRIMARY KEY ((user_id), article_id)
) WITH CLUSTERING ORDER BY (article_id DESC);

CREATE TABLE articles_by_locations (
  location frozen<location>,
  article_id timeuuid,
  username text,
  title text,
  subtitle text,
  content text,
  PRIMARY KEY ((location), article_id)
);

CREATE TABLE locations_by_article (
  article_id timeuuid,
  location frozen<location>,
  PRIMARY KEY ((article_id), location)
);

CREATE TABLE location_distance (
  distance_code text,
  location_a frozen<location>,
  distance bigint,
  location_b frozen<location>,
  PRIMARY KEY ((distance_code, location_a), distance)
);

CREATE TABLE articles_by_user_and_status (
  user_id timeuuid,
  status text,
  article_id timeuuid,
  username text,
  date timestamp,
  title text,
  subtitle text,
  content text,
  type text,
  video_url text,
  video_encoding frozen<encoding>,
  images Set<frozen<image>>,
  tags Set<text>,
  PRIMARY KEY ((user_id, status), article_id)
) WITH CLUSTERING ORDER BY (article_id DESC);

CREATE TABLE likes_by_article (
  article_id timeuuid,
  likes counter,
  PRIMARY KEY (article_id)
);

CREATE TABLE likes_by_article_and_user (
  article_id timeuuid,
  like_timestamp timestamp,
  user_id timeuuid,
  username text,
  PRIMARY KEY ((article_id), like_timestamp, user_id)
);

CREATE TABLE bookmarks_by_article (
  article_id timeuuid,
  bookmarks counter,
  PRIMARY KEY (article_id)
);

CREATE TABLE bookmarks_by_article_and_user (
  article_id timeuuid,
  bookmark_timestamp timestamp,
  user_id timeuuid,
  username text,
  PRIMARY KEY ((article_id), bookmark_timestamp, user_id)
);

CREATE TABLE shares_by_article (
  article_id timeuuid,
  shares counter,
  PRIMARY KEY (article_id)
);

CREATE TABLE shares_by_article_and_user (
  article_id timeuuid,
  share_timestamp timestamp,
  user_id timeuuid,
  username text,
  share_type text,
  PRIMARY KEY ((article_id), share_timestamp, user_id)
);

CREATE TABLE comments_by_article (
  article_id timeuuid,
  comments counter,
  PRIMARY KEY (article_id)
);

CREATE TABLE comments_by_article_and_user (
  article_id timeuuid,
  comment_timestamp timestamp,
  user_id timeuuid,
  username text,
  comment text,
  PRIMARY KEY ((article_id), comment_timestamp, user_id)
);

CREATE TABLE interactions_by_article_and_user (
  article_id timeuuid,
  interaction_timestamp timestamp,
  interaction_type text,
  user_id timeuuid,
  username text,
  PRIMARY KEY ((article_id), interaction_timestamp, interaction_type, user_id)
);

INSERT INTO articles (article_id, user_id, date, title, subtitle, content, images)
     VALUES (1461e930-82d7-11e7-8b73-6d2c86545d91, 50554d6e-29bb-11e5-b345-feff819cdc9f, toUnixTimestamp(1461e930-82d7-11e7-8b73-6d2c86545d91), 'Murder on downtown', 'Yesterday downtown had a murder', 'Yesterday downtown had a murder', {{url:'https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png', description: 'Picture of the person who died'}});

INSERT INTO articles_by_user (article_id, user_id, username, date, title, subtitle, content, images)
     VALUES (1461e930-82d7-11e7-8b73-6d2c86545d91, 50554d6e-29bb-11e5-b345-feff819cdc9f, 'henrique_limas', toUnixTimestamp(1461e930-82d7-11e7-8b73-6d2c86545d91), 'Murder on downtown', 'Yesterday downtown had a murder', 'Yesterday downtown had a murder', {{url:'https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png', description: 'Picture of the person who died'}});

