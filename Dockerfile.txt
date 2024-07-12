FROM node:18-alpine3.20 as BUILD

WORKDIR /app
COPY package.json .
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:latest as DEPLOY

EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD /app/build/. /usr/share/nginx/html/
