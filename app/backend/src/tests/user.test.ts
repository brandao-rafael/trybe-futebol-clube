import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';

import {
  noEmail,
  noPassword,
  wrongEmail,
  wrongPassword,
} from './mocks/user.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('test if route login have an expected behavior', () => {
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