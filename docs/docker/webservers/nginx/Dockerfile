FROM node:16.19.0-alpine AS build-react-app

LABEL author=duong755

WORKDIR /react-app

COPY package.json yarn.lock ./

RUN npm i -g corepack && \
  corepack enable && \
  corepack prepare yarn@3.5.0 --activate

COPY . .

# must run yarn install right before yarn build
RUN yarn install

RUN yarn build:prod

FROM nginx:1.22.1-alpine

COPY ./docker/webservers/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-react-app /react-app/dist /usr/share/nginx/html/react-app

EXPOSE 80
