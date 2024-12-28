import {consultarDev, consultarAdmin } from '../../data/fs.js'



export function consultarUser (user, email , senha){

    if(user==="Dev"){
       return consultarDev(email , senha)
        

    }
    if(user==="Admin"){
       return  consultarAdmin(email , senha)
    }



}


export default {
    consultarUser,
}