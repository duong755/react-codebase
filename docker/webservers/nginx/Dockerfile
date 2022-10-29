FROM node:14-alpine AS build-react-app

LABEL author=duong755

WORKDIR /react-app

COPY package.json yarn.lock ./

RUN yarn install --silent --frozen-lockfile

COPY ./ ./

RUN yarn build:prod

FROM nginx:1.22.0

COPY ./docker/webservers/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-react-app /react-app/build /usr/share/nginx/html

EXPOSE 80
