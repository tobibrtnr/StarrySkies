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
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
