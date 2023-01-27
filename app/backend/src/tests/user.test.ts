import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/users.model';
import { App } from '../app';

import {
  noEmail,
  noPassword,
  wrongEmail,
  wrongPassword,
  allrightUser,
  expectedResult,
} from './mocks/user.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('test if route login have an expected behavior', () => {
  let chaiHttpResponse: Response

  before(async () => {
    // return sinon.stub(Users, 'findOne').resolves({
    //   ...expectedResult
    // });
  })
  it('is impossible siginIn without password', async () => {
    const result = await chai.request(app).post('/login').send(noPassword);

    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled'});
    expect(result.status).to.be.equal(400);
  });

  it('is impossible siginIn without email', async () => {
    const result = await chai.request(app).post('/login').send(noEmail);

    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled'});
    expect(result.status).to.be.equal(400);
  });

  it('is impossible siginIn with wrong email', async () => {
    const result = await chai.request(app).post('/login').send(wrongEmail);

    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled'});
    expect(result.status).to.be.equal(400);
  });

  it('is impossible siginIn without email', async () => {
    const result = await chai.request(app).post('/login').send(wrongPassword);

    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled'});
    expect(result.status).to.be.equal(400);
  });
})