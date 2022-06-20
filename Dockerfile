FROM node:alpine AS build

WORKDIR /app
COPY / ./
COPY package.json ./

RUN npm install
RUN ng build

COPY . .

FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/dist/frontend /usr/share/nginx/html