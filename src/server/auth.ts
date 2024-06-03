import express, { Router } from 'express';
import { api } from './api';
import { repo, type UserInfo } from 'remult';
import { compare } from 'bcryptjs';
import { User } from '../shared/entities/user';

export const auth = Router();
auth.use(express.json());
auth.use(api.withRemult);

auth.post('/api/login', async (req, res) => {
  const user = await repo(User).findFirst({ name: req.body.name });

  if (
    user &&
    user.active &&
    (await compare(req.body.password, user.password))
  ) {
    const userInfo: UserInfo = {
      id: user.id,
      name: user.name,
      roles: user.isAdmin ? ['admin'] : [],
    };

    if (req.session) {
      req.session['user'] = userInfo;
    }
    res.json(userInfo);
  } else {
    res.status(404).send('Invalid user or password');
  }
});

auth.post('/api/logout', async (req, res) => {
  if (req.session) {
    req.session['user'] = null;
  }
  res.json('logged out');
});

auth.post('/api/currentUser', async (req, res) => {
  if (req.session) {
    res.json(req.session['user']);
  } else {
    res.json(null);
  }
});
