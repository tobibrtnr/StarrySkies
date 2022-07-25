# https://github.com/docker-library/postgres/issues/661

FROM postgres:latest AS builder

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DATABASE
ARG APP_USER
ARG APP_PASSWORD
ARG APP_DATABASE

ENV POSTGRES_USER      $POSTGRES_USER
ENV POSTGRES_PASSWORD  $POSTGRES_PASSWORD
ENV POSTGRES_DATABASE  $POSTGRES_DATABASE
ENV APP_USER           $APP_USER
ENV APP_PASSWORD       $APP_PASSWORD
ENV APP_DATABASE       $APP_DATABASE

ENV PGDATA             /var/lib/postgresql/custom

USER postgres

COPY custom-entrypoint.sh /usr/local/bin/
COPY init /docker-entrypoint-initdb.d/
COPY sql  /tmp

USER root

RUN chmod +x /usr/local/bin/custom-entrypoint.sh

USER postgres

RUN    mkdir "${PGDATA}" \ 
    && custom-entrypoint.sh postgres

ENTRYPOINT [ "custom-entrypoint.sh" ]
CMD [ "-c", "max_locks_per_transaction=512" ]




FROM postgres:latest

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DATABASE
ARG APP_USER
ARG APP_PASSWORD
ARG APP_DATABASE

ENV POSTGRES_USER      $POSTGRES_USER
ENV POSTGRES_PASSWORD  $POSTGRES_PASSWORD
ENV POSTGRES_DATABASE  $POSTGRES_DATABASE
ENV APP_USER           $APP_USER
ENV APP_PASSWORD       $APP_PASSWORD
ENV APP_DATABASE       $APP_DATABASE

VOLUME /var/lib/postgresql/data

COPY --from=builder /var/lib/postgresql/custom /var/lib/postgresql/data

HEALTHCHECK CMD ["CMD-SHELL", "pg_isready -U $APP_USER -d $APP_NAME"]
