import {buscarTitulosJSON} from "../../data/fs.js"


export function get(key){
  const dados = buscarTitulosJSON(key)
  
   return  dados[key];
}

export default {get}
