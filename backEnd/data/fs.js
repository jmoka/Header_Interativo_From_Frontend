import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./dbConfig.json');
const pdPath = path.resolve('./padraoConfig.json');

export function deleteDbConfig() {
    const dbPathExiste = fs.existsSync(dbPath); // verifica se o arquivo existe no caminho
    if (dbPathExiste) {
        fs.unlink(dbPath, (err) => {
            if (err) {
                console.error('Erro ao deletar o arquivo:', err);
                return;
            }
            console.log('Arquivo deletado com sucesso!');
        });
    } else {
        console.log('Arquivo não existe para ser deletado!');
    }
}

export function pdPathCriar() {
    const dbPathVerificado = fs.existsSync(dbPath); // verifica se existe o arquivo
    console.log(dbPathVerificado);

    if (dbPathVerificado) {
        console.log("Base já existe");
    } else {
        try {
            const dadosPadraoString = fs.readFileSync(pdPath, "utf8"); // pega os dados do arquivo
            const dadosPadrao = JSON.parse(dadosPadraoString);
            fs.writeFileSync(dbPath, JSON.stringify(dadosPadrao, null, 2));
            const dbConfig = JSON.parse(fs.readFileSync(dbPath, "utf8"));
            console.log("Base criada com sucesso");
          
        } catch (error) {
            console.error("Erro ao criar a base:", error.message);
        }
    }
}

export function atualizarDbconfg(key, item, value) {
    if (!fs.existsSync(dbPath)) {
        console.error('Arquivo de configuração não encontrado!');
        return null;
    }

    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        const dbConfig = JSON.parse(data);

        // Verifica se a chave e o item existem
        if (dbConfig[key] && dbConfig[key][item] !== undefined) {
            dbConfig[key][item] = value; // Atualiza o valor
            fs.writeFileSync(dbPath, JSON.stringify(dbConfig, null, 2));
          
            return dbConfig[key]; // Retorna a seção atualizada
        } else {
            console.warn(`Propriedade ${key}.${item} não encontrada no arquivo de configuração.`);
            return null;
        }
    } catch (err) {
        console.error('Erro ao atualizar o arquivo:', err.message);
        return null;
    }
}


export function buscarTitulosJSON(key){
    const data = fs.readFileSync(dbPath, 'utf8');
    const dbConfig = JSON.parse(data);
    

    return dbConfig

}

export function userAtivo(user, email, senha) {
    const data = fs.readFileSync(dbPath, "utf8");
   const  data1 = JSON.parse(data);
    const emailDev = data1["login"]["emailDev"];
    const senhaDev = data1["login"]["devS"];
    const emailAdmin = data1["login"]["emailAdmin"];
    const adminrS = data1["login"]["adminrS"];
 
    

    if(user === "Dev" && email === emailDev && senha === senhaDev){        
        
        const email = data1["login"]["emailDev"];
        const senha = data1["login"]["devS"];

        console.log(`${user} = >` , email, "", senha);

        console.log("Logado Dev", data1["login"]["emailDev"] );


        const devLogado = {
            "user" : data1["login"]["dev"],
            "email" : data1["login"]["emailDev"],
            "senha" : data1["login"]["devS"],
        }

        console.log(devLogado);       

        return devLogado;
      
    } else if (user === "Admin" && email === emailAdmin && senha === adminrS ) {
        
        const email = data1["login"]["emailAdmin"];
        const senha = data1["login"]["adminrS"];

        console.log(`${user} = >` , email, "", senha);
 

        console.log("Logado Admin", data1["login"]["emailAdmin"] );

        const adminLogado = {
            "user" : data1["login"]["admin"],
            "email" : data1["login"]["emailAdmin"],
            "senha" : data1["login"]["adminrS"],
        }
        
        console.log(adminLogado);
        


        return adminLogado;
    }else{
        console.log("Usuário não Encontrado");
        
    }
}



export default {
    userAtivo,
    buscarTitulosJSON,
    pdPathCriar,
    atualizarDbconfg,
    deleteDbConfig
} 



