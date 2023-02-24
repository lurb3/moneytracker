import { faker } from '@faker-js/faker';
import request from 'request';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('/api/user_settings', function() {
  const url = process.env.API_URL;
  let userId = null;

  before(function(done) {
    //Create user
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

  it('Create user settings', function(done) {
    request({
      url: `${url}/api/user_settings/${userId}`,
      method: 'POST',
      json: true,
      body: {totalBudget: faker.datatype.number({ min: 300, max: 9999999 })}
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.have.property('totalBudget');
      expect(body).to.have.property('user');
      done();
    });
  });
});