# React App codebase

## What does this codebase have?

This codebase is massively copied from `create-react-app`'s ejected app. It has/supports:

- `webpack.config.js`.
- Babel and TypeScript.
- React, Redux (thunk, saga, and observable - keep what you choose, uninstall others, or use them all, it is OK).
- ESLint and Prettier.
- SASS/SCSS/CSS modules and Tailwindcss.
- EditorConfig.
- Docker (for development and deployment).

## How to use

To use this locally, firstly, clone this repository, then you can run it with or without Docker.
### Option 1. Without Docker

- Install Node.js (>=14), you might want to install specific versions of Node.js via [nvm](https://github.com/nvm-sh/nvm)
- Install dependencies by running the command `yarn` or `yarn install`.
- Run `yarn start` and open `http://localhost:3000` in your browser of choice.

### Option 2. With Docker

- Install Docker and Docker Compose.
- Run `docker-compose up -d`.

In this option, the configuration file has already used Docker volume, which allow live reloading when you save changes to source code (of course, this is possible also due to `webpack-dev-server`). In other words, you don't have to `docker-compose restart` to update the running react app.
