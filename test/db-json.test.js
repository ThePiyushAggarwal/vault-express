require('dotenv').config();
const { expect } = require('chai');

let env = process.env;
process.env = { DB_JSON: "dbtest.json" };

const db = require('../db/db-json');
const seed = require('../seed.json');
const fs = require('fs');

describe('DB Json', () => {

  after(function() {
    fs.unlinkSync(process.env.DB_JSON);
    process.env = env;
  });

  // seed Method
  describe('seed', () => {
    it('should seed the actual db with sample json file', () => {
      expect(db.seed().users).to.deep.equal(seed);
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.createUser(user)).to.include(user);
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by user_id', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.findById(user.user_id)).to.deep.equal(user);
    });
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.findByName(user.username)).to.deep.equal(user);
    });
  });

  // update Method
  describe('update', () => {
    it('should update a specific user by user_id', () => {
      const user = { username: 'test by mocha updated', user_id: 'testbymocha' };
      expect(db.update(user)).to.deep.equal(user);
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by user_id', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.remove(user.user_id)).to.not.include(user);
    });
  });

});
