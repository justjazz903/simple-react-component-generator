import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

async function writeComponent(targetDirectory, type, fileName){
  try{
    await access(targetDirectory, fs.constants.R_OK);
  }catch(err){
    console.log("must have a 'src/components' folder")
    console.log(err);
    process.exit(1);
  }
  targetDirectory = path.resolve(targetDirectory, fileName + ".js");
  let content;
  if(type === 'f'){
    content = "import React from \'react\';\n\nexport function " + fileName + "(props) {\n  return (\n    <div>\n\n    <\/div>\n  );\n}\n";
  }
  if(type === 'c'){
    content = "import React from \'react\';\n\nexport class test extends React.Component {\n  constructor(props){\n    super(props);\n    this.state = {};\n  }\n  render(){\n    return(\n      <div>\n\n      <\/div>\n    );\n  }\n}\n";
  }
  console.log("creating functional component...");
  await fs.writeFile(targetDirectory, content, function (err) {
    console.log(err);
  });
  console.log("component is created successfully!");
}

export async function createComponent(options){
  let targetDirectory = path.resolve(process.cwd(), "src/components");
  writeComponent(targetDirectory, options.type, options.name);
}
