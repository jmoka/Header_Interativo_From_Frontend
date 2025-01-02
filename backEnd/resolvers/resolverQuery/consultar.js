import {buscarTitulosJSON, buscarPerfilEmail} from "../../data/fs.js"


export function getTitulos(key){
  const dados = buscarTitulosJSON()
    console.log(dados[key]);
    
  
   return  dados[key];
}
export function getPerfil(email){
  const dados = buscarPerfilEmail(email)
  
   return  dados;
}

export default {
  getTitulos, 
  getPerfil
}
