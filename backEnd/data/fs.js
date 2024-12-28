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

export function consultarDev(email, senha) {
    const data = fs.readFileSync(dbPath, "utf8");
    const dev = JSON.parse(data);
    const emailDev = dev["login"]["emailDev"];
    const senhaDev = dev["login"]["devS"];

    console.log(emailDev, "", senhaDev);

    if (email === emailDev && senha === senhaDev) {
        console.log("Logado Dev", dev["login"]["emailDev"] );
        const devLogado = {
            "user" : dev["login"]["dev"],
            "email" : dev["login"]["emailDev"],
            "senha" : dev["login"]["devS"],
        }

        console.log(devLogado);
        
    
        return devLogado;
            
        
    } else {
        console.log("Erro ao Logar Dev");
        return null; // Retorne algo em caso de erro para evitar falhas
    }
}


export function consultarAdmin(email, senha){

        const data = fs.readFileSync(dbPath, "utf8");
        const admin = JSON.parse(data);
        const emailAdmin = admin.login.email ;
        const senhaAdmin = admin.login.senha;
        const hashAdmin = admin.login.adminHash;

        if(email === emailAdmin && senha === A){
            console.log("Logado admin");

        }else{
            console.log("Erro ao Logar admin");
        }


    
}

export default {
    consultarAdmin,
    consultarDev,
    buscarTitulosJSON,
    pdPathCriar,
    atualizarDbconfg,
    deleteDbConfig
} 



