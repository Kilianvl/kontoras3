// src/server/api.ts

import { remultExpress } from 'remult/remult-express'
import { Customer } from '../shared/entities/customer';
import * as express from 'express';
import { hash} from 'bcryptjs';
import { User } from '../shared/entities/user';

export const api = remultExpress({
  getUser: (req: express.Request) => req.session!['user'],
  entities: [User,Customer],
  admin:true,
})

User.hash = (password: string) => hash(password, 10);
console.log('api loaded!');
