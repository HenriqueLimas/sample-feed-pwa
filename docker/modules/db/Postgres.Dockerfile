FROM postgres:10.5
RUN mkdir -p /docker-entrypoint-initdb.d

ADD db/tables.postgres.sql /docker-entrypoint-initdb.d