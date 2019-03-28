const { prisma } = require('../generated/prisma-client');
const validateAndParseIdToken = require('../validateAndParseIdToken');

var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');

var jwt = require('jsonwebtoken');
const Mutation = {
  async hi(parent, args, ctx) {
    console.log(ctx.req.headers)
    return 'hello mutation';
  },

  async authenticate(parent, args, ctx) {
    // 1. check if there is a user with that email
    // check user database
    // add 
    console.log(args);
    return true;
  }
};

module.exports = Mutation;
