FROM node:14-alpine AS build-react-app

LABEL author=duong755

WORKDIR /react-app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY ./ ./

RUN yarn build:prod

FROM nginx:1.22.0

COPY --from=build-react-app /react-app/build /usr/share/nginx/html

COPY ./docker/prod/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
