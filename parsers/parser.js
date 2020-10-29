const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

class Parser{
  /* An "abstract class" (or about as close as I can get to it in Javascript) for a class
  that parses and counts our lines. Child classes can specific line counting logic based on 
  file type*/

  constructor(file){
    this.file = file;

    //language-specific comment symbols
    this.inline;
    this.blockOpen;
    this.blockClose;
    //assumes this.blockOpen.length == this.blockClose length
  }

  async parse(){
    /*look line by line in a file and count for lines count, comments (inline and block scope),
     todos, etc. as specified.

    Parsing logic should be mostly similar amongst languages, and if not, this function can be
    overriden in its subclass.

    Returns an obj containing the desired line data
    */

    let stream = fs.createReadStream(this.file);
    let rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    let lines = 0;
    let isBlockComment = false; //true if the begining of this line is in a block comment
    let isInlineComment = false; //true if the rest of this line is an inline comment
    let blockCommentLines = 0;
    let blockComments = 0;
    let inlineCommentLines = 0;
    let todos = 0;

    for await(let line of rl){
      lines += 1; //count all lines, even empty ones
      line = line.trim(); //clear leading and trailing whitespaces
      isInlineComment = false; //assume this isn't an inline comment until otherwise proven

      //if this line is a block comment
      if(isBlockComment)
        blockCommentLines += 1;

      //iterate through line, seeing if a block comment either starts or ends
      for(let i = 0; i < line.length + 1 - this.blockOpen.length; i++){
        let substr = line.substring(i, i + this.blockOpen.length);

        //check for opening or closing of block comment
        if(substr === this.blockOpen && !isBlockComment){
          blockCommentLines += 1;
          isBlockComment = true;
        }
        else if(substr === this.blockClose && isBlockComment){
          blockComments += 1;
          isBlockComment = false;
        }

        //check for single line comment outside of block comment
        if(i <= line.length - this.inline.length){
          let substr = line.substring(i, i + this.inline.length);
          if(substr === this.inline && !isBlockComment){
            inlineCommentLines += 1;
            isInlineComment = true;
          }
        }

        //check for todos
        if(isInlineComment || isBlockComment){
          if(i <= line.length - 4 && line.substring(i, i + 4) === "TODO"){
            todos += 1;
          }
        }
      }

    }
    console.log(chalk.bgWhite.bold.black(this.file));
    console.log("Total # of lines comments: " + lines);
    console.log("Total # of comment lines: ", blockCommentLines + inlineCommentLines);
    console.log("Total # of single line comments: " + inlineCommentLines);
    console.log("Total # of comment lines within block comments: " + blockCommentLines);
    console.log("Total # of block line comments: " + blockComments);
    console.log("Total # of todos: " + todos);
    console.log(chalk.gray('----------------------------------------'));
  }
}

module.exports = Parser;