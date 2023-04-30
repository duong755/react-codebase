FROM node:16.19.0-alpine AS build-react-app

LABEL author=duong755

ARG VITE_API_BASE_URL

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

COPY ./docs/docker/webservers/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-react-app /react-app/dist /usr/share/nginx/html/react-app

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -sSf http://localhost/ || exit 1

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
