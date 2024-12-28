// Em resolvers/index.js
import loginUsuario from "./loginUsuario.js";

import {get} from "./resolverQuery/consultar.js";
import {atualizar} from "./resolverMutation/atualizar.js";

const Mutation = {
    logar(_, { dados }, { req }) {
        return loginUsuario(dados, req);
    },
    atualizar(_,{key, item, value }){
        console.log(value);
        console.log(typeof(value));


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
    
    consultar(_, {key}){
        return get(key);
    }
};

export default { Query, Mutation };
