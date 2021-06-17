## For Developers:

Clone the source locally:

```bash
$ git clone https://github.com/swarnabgarang/note-app-backend.git
$ cd note-app-backend
```

Install project dependencies:

```bash
$ npm install
```

Create environment variables:

1. Create directory `config`
1. Create file `dev.env` inside directory `config`
1. Enter env variables

```
NOTER_MONGODB_URL="<mongodb connection url>"
NOTER_JWT_SECRET="<JWT secret key>"
```

Start the app:

```bash
$ npm run start
```

---

Contributions are welcome

---

## Built with

- [NodeJS](https://nodejs.org/en/ "NodeJS")
- [ExpressJS](https://expressjs.com/ "ExpressJS")

---
