FROM node:lts-alpine as build-stage

# make the 'frontend' folder the current working directory
WORKDIR /frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN npm install

COPY . .
COPY vite.config.ts /frontend/vite.config.ts

RUN npm run build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /frontend/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /etc/letsencrypt/live/tobibrtnr.de
COPY ./fullchain.pem /etc/letsencrypt/live/tobibrtnr.de/fullchain.pem
COPY ./privkey.pem /etc/letsencrypt/live/tobibrtnr.de/privkey.pem
 
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
