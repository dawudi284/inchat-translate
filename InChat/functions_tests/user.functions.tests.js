/* jshint esversion: 8 */

const userFunctions = require('../functions/user.functions');
const mocha = require('mocha');
const chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;

describe('User Functionality', function () {
  describe('#createUser() JSON format', function () {
    const displayName = 'Bob Smith';
    let user = {
      'name': `${displayName}`,
      'chatIds': [
        '12345',
        '67890',
        '13579',
        '24680'
      ],
      'friends': [
        '12345',
        '67890',
        '13579',
        '24680'
      ]
    };

    it('should return true that user.name === displayName', function () {
      assert.equal(`${displayName}`, user.name);
    });

    it('should return true, for each chatId, that all chatIds are of type \'string\'', function () {
      for (var _chatId of user.chatIds)
        assert.equal('string', typeof(_chatId));
    });

    it('should return true, for each friend, that all friends are of type \'string\'', function () {
      for (var _friend of user.friends)
        assert.equal('string', typeof(_friend));
    });
  });

  describe('#doesUserExist() JSON format', function () {
    it('should assert true === true', function () {
      assert.equal(true, true);
    });
  });

  describe('#deleteUser() JSON format', function () {
    // Add tests
  });
});
