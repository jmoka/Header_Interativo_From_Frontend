// Em resolvers/index.js
// import loginUsuario from "./loginUsuario.js";

import {get} from "./resolverQuery/consultar.js";
import {atualizarDb} from "./resolverMutation/atualizarDb.js";
import {logar} from "./resolverMutation/logar.js";

const Mutation = {
    logar(_, {user, email, senha}){

        return logar(user, email, senha)
    },
    atualizarDb(_,{key, item, value }){
       
        const valueIserido = { // objeto de tipo
            "string" : String,
            "boolean" : Boolean,
            "Number" : Number,
        }
 
        const tipo = typeof value; // verifico o tipo
        if(valueIserido[tipo]){  // seleciono o tipo no objeto

                return atualizar(key, item,valueIserido[tipo](value)) // retorno o objeto do tipo selecionado

        }else{
                throw new Error(`Tipo "${tipo}" não suportado.`);
            }
    }
   
};

const Query = {
    
    consultarTitulos(_, {key}){
        return get(key);
    },
  

};

export default { Query, Mutation };
