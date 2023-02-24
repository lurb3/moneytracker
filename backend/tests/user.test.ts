import { faker } from '@faker-js/faker';
import request from 'request';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('/api/user', function() {
  const url = process.env.API_URL;
  let userId = null;

  it('Create user', function(done) {
    request({
      url: `${url}/api/user`,
      method: 'POST',
      json: true,
      body: {username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password(20)}
    }, (err, res, body) => {
      userId = body._id
      expect(res.statusCode).to.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.not.have.property('password');
      done();
    });
  });

  it('Get user', function(done) {
    request({
      url: `${url}/api/user/${userId}`,
      method: 'GET',
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Delete user', function(done) {
    request({
      url: `${url}/api/user/${userId}`,
      method: 'DELETE',
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});