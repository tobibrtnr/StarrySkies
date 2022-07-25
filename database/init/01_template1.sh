#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DATABASE" <<-EOSQL
\connect template1
CREATE EXTENSION IF NOT EXISTS pgcrypto;                  
EOSQL

echo "------------> 00_template1.sh has finished sucessfully"
