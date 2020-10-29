const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const JavaParser = require('./javaParser');
const PythonParser = require('./pythonParser');

class ParserManager{

  isDirectory(file){
    //returns true if path is a directory
    //assumes path is a valid file path
    return fs.lstatSync(file).isDirectory();
  }

  async parse(file){
    try {
      if(!this.isDirectory(file)){
        let parser = this.getParser(file);
        await parser.parse();
      }
      else{
        fs.readdir(file, (err, files) => {
          let results = [];
          files.forEach(async (subfile) => {
            let fullPath = path.join(file, subfile);
            await this.parse(fullPath);
          });
        });
      }
    } 
    catch(error){
      console.log(chalk.bgRed.bold('Error: no such file or directory "' + file + '"'));
    }
  }

  getParser(file){
    //returns the appropriate parser class required to read files of this extension
    let extension = path.extname(file);

    switch(extension){
      case ".java":
        return new JavaParser(file);
      case ".py":
        return new PythonParser(file);
      default:
        return new JavaParser(file);
    }
  }
}

module.exports = ParserManager;