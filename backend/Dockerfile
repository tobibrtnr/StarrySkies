FROM node:lts-alpine

ARG PORT
ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET
ARG PG_USER
ARG PG_PASSWORD
ARG PG_DATABASE
ARG PG_HOST
ARG PG_PORT

ENV PORT                 $PORT
ENV ACCESS_TOKEN_SECRET  $ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET $REFRESH_TOKEN_SECRET
ENV PG_USER              $PG_USER
ENV PG_PASSWORD          $PG_PASSWORD
ENV PG_DATABASE          $PG_DATABASE
ENV PG_HOST              $PG_HOST
ENV PG_PORT              $PG_PORT

# make the 'backend' folder the current working directory
WORKDIR /backend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./                  

RUN npm install --production

COPY . .

CMD ["npm", "run", "prod"]
