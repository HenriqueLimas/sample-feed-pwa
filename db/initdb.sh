#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE news_in_city;
    GRANT ALL PRIVILEGES ON DATABASE news_in_city TO docker;
EOSQL