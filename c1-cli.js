#!/usr/bin/env node
'use strict';

// import program from 'commander';
// import ParserManager from './parsers/parserManager';
const program = require('commander');
const ParserManager = require('./parsers/parserManager');

program
  .version('0.0.1')
  .option('-r, --read [read]', 'list of customers in CSV file')
  .parse(process.argv)

let filePath = process.argv[process.argv.length - 1];

let p = new ParserManager();
console.log('----------------------------------------');
p.parse(filePath);