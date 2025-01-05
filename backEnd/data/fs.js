import fs from "fs";
import path from "path";
import  {consultarHash}  from "../data/hash.js";
import Token from "../data/token.js"

const dbPath = path.resolve("./dbConfig.json");
const pdPath = path.resolve("./padraoConfig.json");
let dbConfig = {};


export function deleteDbConfig() {
  const dbPathExiste = fs.existsSync(dbPath); // verifica se o arquivo existe no caminho
  if (dbPathExiste) {
    fs.unlink(dbPath, (err) => {
      if (err) {
        console.error("Erro ao deletar o arquivo:", err);
        return;
      }
      console.log("Arquivo deletado com sucesso!");
    });
  } else {
    console.log("Arquivo não existe para ser deletado!");
  }
}

export function pdPathCriar() {
  const dbPathVerificado = fs.existsSync(dbPath); // verifica se existe o arquivo


  if (dbPathVerificado) {
    console.log("Base já existe");
  } else {
    try {
      const dadosPadraoString = fs.readFileSync(pdPath, "utf8"); // pega os dados do arquivo
      const dadosPadrao = JSON.parse(dadosPadraoString);
      fs.writeFileSync(dbPath, JSON.stringify(dadosPadrao, null, 2));
      dbConfig = JSON.parse(fs.readFileSync(dbPath, "utf8"));
      console.log("Base criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar a base:", error.message);
    }
  }
}

export function atualizarDbconfg(key, item, value) {
  if (!fs.existsSync(dbPath)) {
    console.error("Arquivo de configuração não encontrado!");
    return null;
  }

  try {
    const data = fs.readFileSync(dbPath, "utf8");
    dbConfig = JSON.parse(data);

    // Verifica se a chave e o item existem
    if (dbConfig[key] && dbConfig[key][item] !== undefined) {
      dbConfig[key][item] = value; // Atualiza o valor
      fs.writeFileSync(dbPath, JSON.stringify(dbConfig, null, 2));

      return dbConfig[key]; // Retorna a seção atualizada
    } else {
      console.warn(
        `Propriedade ${key}.${item} não encontrada no arquivo de configuração.`
      );
      return null;
    }
  } catch (err) {
    console.error("Erro ao atualizar o arquivo:", err.message);
    return null;
  }
}

export function buscarTitulosJSON() {
  const data = fs.readFileSync(dbPath, "utf8");
  dbConfig = JSON.parse(data);
  return dbConfig;
}


export function buscarPerfilEmail(email){
  
  const data = buscarTitulosJSON()
  
  
  if(email === data.login.emailDev){
    const perfil ={
      "user" : data.login.dev,
      "email": data.login.emailDev
    }
    return perfil;
    

  }else if(email === data.login.emailAdmin){

    const perfil ={
      "user" : data.login.admin,
      "email": data.login.emailAdmin
    }
    return perfil;
    
  }else if(email === data.login.emailUse){
    const perfil ={
      "user" : data.login.use,
      "email": data.login.emailUse
    }
    return perfil;
  }else{
    return false
  }
  

}

export async function logado(user, email, senha) {
  const data = fs.readFileSync(dbPath, "utf8");
  const data1 = JSON.parse(data);

  const emailDev = data1["login"]["emailDev"];
  const devHash = data1["login"]["devHash"];
  const emailAdmin = data1["login"]["emailAdmin"];
  const adminHash = data1["login"]["adminHash"];
  const emailUse = data1["login"]["emailUse"];
  const useHash = data1["login"]["useHash"];

  if (user === "Dev" && email === emailDev) {
    const autenticacao = await consultarHash(senha, devHash);

    if (!autenticacao) {
      throw new Error("Erro: senha incorreta ou usuário inválido.");
    }



    console.log("Logado como Dev");
   
    
     const token = Token.gerarToken(data1.login)

    //  console.log(token, "  gerarToken");
    

    const devLogado = {
      user: data1["login"]["dev"],
      email: data1["login"]["emailDev"],
      token: token, // Apenas para fins de teste; evite armazenar senhas em texto simples.
       };

    // console.log(devLogado);
    return devLogado;
  }
  if (user === "Admin" && email === emailAdmin) {
    const autenticacao = await consultarHash(senha, adminHash);

    if (!autenticacao) {
      throw new Error("Erro: senha incorreta ou usuário inválido.");
    }

    console.log("Logado como Admin");

    const adminLogado = {
      user: data1["login"]["admin"],
      email: data1["login"]["emailAdmin"],
      senha: senha, // Apenas para fins de teste; evite armazenar senhas em texto simples.
    };

    // console.log(adminLogado);
    return adminLogado;
  }
  if (user === "User" && email === emailUse) {
    const autenticacao = await consultarHash(senha, useHash);

    if (!autenticacao) {
      throw new Error("Erro: senha incorreta ou usuário inválido.");
    }

    console.log("Logado como Admin");

    const userLogado = {
      user: data1["login"]["use"],
      email: data1["login"]["emailUse"],
      senha: senha, // Apenas para fins de teste; evite armazenar senhas em texto simples.
    };

    // console.log(userLogado);
    return userLogado;
  }



  console.log("Usuário não encontrado ou credenciais inválidas.");
  return false;
}

export function buscarDbConfig (){ 
  return  fs.readFileSync(dbPath, "utf8");

}
export function buscarPdConfig (){ 
  return  fs.readFileSync(pdPath, "utf8");

}


export default {
  logado,
  buscarTitulosJSON,
  pdPathCriar,
  atualizarDbconfg,
  deleteDbConfig,
  buscarDbConfig,
  buscarPdConfig
};
