FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/build /app/build

EXPOSE 80

CMD ["http-server", "build", "-p", "80"]