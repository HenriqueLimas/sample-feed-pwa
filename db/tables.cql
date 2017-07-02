DROP KEYSPACE IF EXISTS news_in_city;

CREATE KEYSPACE news_in_city WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 3 };

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
  user_id uuid,
  username text,
  name frozen<name>,
  email text,
  password text,
  registration_date timestamp,
  PRIMARY KEY (user_id)
);

CREATE TABLE users_by_username (
  username text,
  user_id uuid,
  name frozen<name>,
  email text,
  password text,
  registration_date timestamp,
  PRIMARY KEY (username)
);

CREATE TABLE contributors_by_article (
  article_id timeuuid,
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
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
  user_id uuid,
  username text,
  comment text,
  PRIMARY KEY ((article_id), comment_timestamp, user_id)
);

CREATE TABLE interactions_by_article_and_user (
  article_id timeuuid,
  interaction_timestamp timestamp,
  interaction_type text,
  user_id uuid,
  username text,
  PRIMARY KEY ((article_id), interaction_timestamp, interaction_type, user_id)
);
