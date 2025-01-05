import {buscarTitulosJSON, buscarPerfilEmail, buscarDbConfig, buscarPdConfig} from "../../data/fs.js"


export function getTitulos(key){
  const dados = buscarTitulosJSON()
    console.log(dados[key]);
    
  
   return  dados[key];
}
export function getPerfil(email){
  const dados = buscarPerfilEmail(email)
  
   return  dados;
}
export function getDbConfig(){
  return   buscarDbConfig()
}
export function getPdConfig(){
  return   buscarPdConfig()
}

export default {
  getTitulos, 
  getPerfil
}
