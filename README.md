# App

## Getting started

This is a NextJS app. You will need [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating) and [node](https://nodejs.org/en) installed locally to get started

```bash
nvm install

nvm use

npm install

npm run dev
```

In a separate terminal

```bash
npm run dev:server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For admin settings adding and removing categories and products go to [http://localhost:3000/admin](http://localhost:3000/admin) with your browser to see the result.

A development [json-server](https://www.npmjs.com/package/json-server) is available on [http://localhost:4000](http://localhost:4000)

### Tests

```bash
npm run test
```

Tests require 100% coverage for all files

### Code formatting

Prettier is used to format files, this can be set up in your IDE or by running `npm run format` before committing. Linting can be checked and updated by running `npm run lint:fix`
