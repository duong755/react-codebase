FROM node:14-alpine AS build-react-app

LABEL author=duong755

WORKDIR /react-app

COPY package.json yarn.lock ./

RUN yarn install --silent --frozen-lockfile

COPY ./ ./

RUN yarn build:prod

FROM httpd:2.4.54-alpine

# I copied the following line from https://github.com/docker-library/httpd/blob/f3b7fd9c8ef59d1ad46c8b2a27df3e02d822834f/2.4/Dockerfile#L6
ENV HTTPD_PREFIX /usr/local/apache2

COPY ./docker/webservers/httpd/httpd.conf ${HTTPD_PREFIX}/conf/httpd.conf

COPY --from=build-react-app /react-app/build ${HTTPD_PREFIX}/htdocs

COPY ./docker/webservers/httpd/.htaccess ${HTTPD_PREFIX}/htdocs/.htaccess

EXPOSE 80
