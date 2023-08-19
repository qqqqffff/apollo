require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const azure = require('../')