import {userAtivo } from '../../data/fs.js'



export function consultarUser (user, email , senha){

  
       return userAtivo(user, email , senha)
        

    }
   

export default {
    consultarUser,
}