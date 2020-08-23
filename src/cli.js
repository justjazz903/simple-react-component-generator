import {createComponent} from './main.js';

export function cli(args){
  if(args.length !== 5 || args[2] !== 'g' || (args[3] !== 'c' && args[3] !== 'f')){
    console.log("Use 'srtg g c <name>' to generate class component, 'srtg g f <name>' to generate functional component");
  }
  let options = {
    type: args[3],
    name: args[4]
  }
  createComponent(options);
}
