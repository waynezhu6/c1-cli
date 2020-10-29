#!/usr/bin/env node
'use strict';

// import program from 'commander';
// import ParserManager from './parsers/parserManager';
const program = require('commander');
const chalk = require('chalk');
const ParserManager = require('./parsers/parserManager');

program
  .version('0.0.1')
  .option('[file]', 'generate line count report on file')
  .parse(process.argv)

if(process.argv.length <= 2){
  let platform = process.platform;
  switch(platform){
    case "darwin":
      platform = "macos";
      break;
    case "win32":
      platform = "win.exe";
      break;
  }
  console.log(chalk.bgRed.bold("Error: no file specified. Use c1-cli-" + platform + "-h for help."));
}
else{
  let filePath = process.argv[process.argv.length - 1];
  let p = new ParserManager();
  console.log('----------------------------------------');
  p.parse(filePath);
}
