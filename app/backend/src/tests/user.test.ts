import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
const chaiHttp = require('chai-http');
import Users from '../database/models/users.model';
import { App } from '../app';

import {
  allrightUser,
  expectedResult,
  noEmail,
  noPassword,
  wrongEmail,
  wrongPassword,
} from './mocks/users.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('test if route login have an expected behavior', () => {
  it('is impossible siginIn without password', async () => {
    const result = await chai.request(app).post('/login').send(noPassword);

    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password'});
    expect(result.status).to.be.equal(400);
  });

  it('is impossible siginIn without email', async () => {
    const result = await chai.request(app).post('/login').send(noEmail);

    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password'});
    expect(result.status).to.be.equal(400);
  });
})