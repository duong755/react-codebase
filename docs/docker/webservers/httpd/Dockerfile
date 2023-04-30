FROM node:16.19.0-alpine AS build-react-app

LABEL author=duong755

WORKDIR /react-app

COPY .yarn .yarnrc.yml package.json yarn.lock ./

RUN npm i -g corepack && \
  corepack enable && \
  corepack prepare yarn@3.5.0 --activate

COPY . .

# must run yarn install right before yarn build
RUN yarn install

RUN yarn build:prod

FROM httpd:2.4.54-alpine

# I copied the following line from https://github.com/docker-library/httpd/blob/f3b7fd9c8ef59d1ad46c8b2a27df3e02d822834f/2.4/Dockerfile#L6
ENV HTTPD_PREFIX /usr/local/apache2

COPY --from=build-react-app /react-app/dist ${HTTPD_PREFIX}/htdocs

COPY ./docs/docker/webservers/httpd/default.conf ${HTTPD_PREFIX}/conf/hosts/default.conf

COPY ./docs/docker/webservers/httpd/.htaccess ${HTTPD_PREFIX}/htdocs/.htaccess

# enable rewrite_module
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> ${HTTPD_PREFIX}/conf/httpd.conf

RUN echo "Include ${HTTPD_PREFIX}/conf/hosts/*.conf" >> ${HTTPD_PREFIX}/conf/httpd.conf

EXPOSE 80
