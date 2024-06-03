// src/server/index.ts

import express from 'express';
import session from 'express-session';

import { api } from './api';

const app = express();

app.use(
  session({
    secret: '27AD3F06-7582-4443-9680-AB6DBB618E53',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(api);

app.listen(6002, () => console.log('Server started'));
