const Parser = require("./parser");

class PythonParser extends Parser{

  constructor(file){
    super(file);

    this.inline = "#";
    this.blockOpen = "'''";
    this.blockClose = "'''";
  }
}

module.exports = PythonParser;