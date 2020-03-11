/* jshint esversion: 8 */

const userFunctions = require('../functions/user.functions');
const mocha = require('mocha');
const chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;

// describe('User Functionality', function() {
//     describe('#createUser()', function() {
//         it('should return -1 when the value is not present', function() {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });