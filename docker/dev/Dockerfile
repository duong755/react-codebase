FROM node:14-alpine

LABEL author=duong755

WORKDIR /react-app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD [ "yarn", "start" ]
