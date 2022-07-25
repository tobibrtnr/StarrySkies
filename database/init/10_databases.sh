#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE USER ${APP_USER} WITH LOGIN CREATEDB PASSWORD '${APP_PASSWORD}';" 

FILES=/tmp/*.sql

echo "Creating Database starryskies !"
createdb --username ${APP_USER} ${APP_DATABASE}

for f in $FILES
do
  psql -v ON_ERROR_STOP=1 --username ${APP_USER} -f $f ${APP_DATABASE}
done

echo "------------> 10_sql.sh has finished sucessfully"
