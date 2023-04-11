# React App boilerplate

[![codecov](https://codecov.io/gh/duong755/js-boilerplates/branch/master/graph/badge.svg?token=3Y4WR9WYFM)](https://codecov.io/gh/duong755/js-boilerplates)

## What does this boilerplate have?

This boilerplate is massively copied from `create-react-app@5.0.1`'s ejected initial app. It has/supports:

- `webpack.config.js`.
- Babel and TypeScript.
- React, Redux (thunk, saga, and observable - keep what you choose, uninstall others, or use them all, it is OK).
- ESLint and Prettier.
- SASS/SCSS/CSS modules and Tailwindcss.
- EditorConfig.
- Docker (for development and deployment).

I also created notes on deploying static website to various cloud services:
- Amazon Web Services (S3, Lightsail)
- Azure (Azure App Service, Azure Storage)
- Google Cloud Platform (Google Cloud Storage, Google Cloud Run, Google Kubernetes Engine)

However, I focus on writing guideline. To have better understanding of cloud services, I recommend reading from the cloud providers' documentation.

## Why did I do this?

I created this repository for study purposes:
- Customize Webpack configuration.
- Construct a boilerplate which contains commonly-used libraries and configuration.
- Take notes on how to deploy a front-end web application (of course, doing so has almost nothing to do with fancy libraries). By doing these, I can gain some experience along the way, since I will try as much platform as possible.

## Prerequisites

- Node 16.19.0
- Yarn v2 (Berry)

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

## Libraries

- Routing
  - `react-router-dom`
- HTTP request
  - `axios`
  - `@tanstack/react-query`
- Internationalization
  - `i18next`
  - `react-i18next`
- State management
  - `zustand`
  - `redux`
  - `react-redux`
  - `@reduxjs/toolkit`
  - `redux-saga`
  - `redux-observable`
- Form
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`
- CSS
  - `@emotion/react`
  - `@emotion/styled`
  - `clsx`
  - `polished`
  - `tailwindcss`
  - `sass`
  - `autoprefixer`
  - `postcss`
- Date and Time
  - `dayjs`
- Devtools
  - Webpack
  - TypeScript
  - Babel
  - Commitlint
  - `lint-staged`
  - `husky`
  - ESLint
  - Prettier
- Testing
  - Jest
  - `@testing-library/react`
  - `msw`
