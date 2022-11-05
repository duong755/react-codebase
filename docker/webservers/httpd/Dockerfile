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

COPY --from=build-react-app /react-app/build ${HTTPD_PREFIX}/htdocs

COPY ./docker/webservers/httpd/default.conf ${HTTPD_PREFIX}/conf/hosts/default.conf

COPY ./docker/webservers/httpd/.htaccess ${HTTPD_PREFIX}/htdocs/.htaccess

# enable rewrite_module
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> ${HTTPD_PREFIX}/conf/httpd.conf

RUN echo "Include ${HTTPD_PREFIX}/conf/hosts/*.conf" >> ${HTTPD_PREFIX}/conf/httpd.conf

EXPOSE 80
