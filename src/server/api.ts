// src/server/api.ts

import { hash } from 'bcryptjs';
import * as express from 'express';
import { JsonDataProvider } from 'remult';
import { remultExpress } from 'remult/remult-express';
import { JsonEntityFileStorage } from 'remult/server';
import { Customer } from '../shared/entities/customer';
import { User } from '../shared/entities/user';
import { initSearch } from './search';

export const api = remultExpress({
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage('./data/db')),
  getUser: (req: express.Request) => (req.session as any)!['user'],
  entities: [User, Customer],
  admin: true,
  initApi: async () => {
    console.log('initApi');
    await initSearch();
  },
});

User.hash = (password: string) => hash(password, 10);
