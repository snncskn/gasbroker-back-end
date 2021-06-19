FROM postgres:12
COPY  ./0-init.sh /docker-entrypoint-initdb.d/
# COPY  ./create.sql /docker-entrypoint-initdb.d/
CMD ["docker-entrypoint.sh", "postgres"]