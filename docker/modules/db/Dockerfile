FROM cassandra:latest

USER root

ADD db/tables.cql /tables.cql

COPY docker/modules/db/entrypoint-wrapper.sh /entrypoint-wrapper.sh
ENTRYPOINT ["/entrypoint-wrapper.sh"]

EXPOSE 9042

CMD ["cassandra", "-f"]