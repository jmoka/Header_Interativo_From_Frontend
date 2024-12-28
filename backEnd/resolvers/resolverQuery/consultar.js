import {buscarTitulosJSON} from "../../data/fs.js"


export function get(key){
  const dados = buscarTitulosJSON(key)
    console.log(dados.home);
  return  dados.home;
}



   
export default {get}
