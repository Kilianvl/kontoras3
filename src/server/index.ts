// src/server/index.ts

import express from 'express';
import session from 'express-session';
import * as path from 'path';
import compression from 'compression';
import { search } from './search';
import { api } from './api';
import { auth } from './auth';
import { initNodeRed } from './node-red';
import open from 'open';
//var FileStore = require('session-file-store')(session);
import FileStore  from 'session-file-store';
const sessionStore = FileStore(session);


const app = express();
app.use(compression());
app.use(
  session({
    secret: '27AD3F06-7582-4443-9680-AB6DBB618E53',
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({path: 'data/sessions', logFn: () => {}}),
  })
);

app.use(api);
app.use(auth);
app.use(search);

app.use('/', express.static('dist/kontoras3/browser'));
app
  .all('/*', function (req, res) {
    res
      .status(200)
      .set('content-type', 'text/html; charset=utf-8')
      .sendFile(
        path.resolve(
          path.join(__dirname, '../../../', 'dist/kontoras3/browser/index.html')
        )
      );
  })
  .on('error', (err) => {
    console.error(err);
  });

const server = app.listen(6002, () => {
  console.log('Server started');
  if (!process.argv.includes('--no-open')) {
    open('http://localhost:6002');
  }
});

initNodeRed(server, app);
