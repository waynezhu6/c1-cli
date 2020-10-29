const Parser = require("./parser");

class JavaParser extends Parser{

  constructor(file){
    super(file);

    this.inline = "//";
    this.blockOpen = "/*";
    this.blockClose = "*/";
  }
}

module.exports = JavaParser;