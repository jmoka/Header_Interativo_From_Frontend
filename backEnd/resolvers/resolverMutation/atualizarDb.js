import {atualizarDbconfg} from "../../data/fs.js"

export function atualizarDb(key, item, value) {
    console.log("Atualizando com os seguintes dados:", { key, item, value });

    // Chama a função para atualizar o arquivo
    const atualizarDados = atualizarDbconfg(key, item, value);
    if (atualizarDados) {
        console.log('Dados atualizados com sucesso:', atualizarDados);
        return atualizarDados; // Retorna os dados atualizados
    } else {
        console.warn('Não foi possível atualizar os dados.');
        return null; // Retorna null caso a atualização falhe
    }
}


   
export default {atualizarDb}
