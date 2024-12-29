import bcrypt from "bcryptjs"; // Substituir bcrypt por bcryptjs

// Função para criar um hash de senha
export function criarHash(senha) {
  try {
    const hashCriado = bcrypt.hashSync(senha, 10); // Sincronizado
    console.log("Hash Criado:", hashCriado);
    return hashCriado;
  } catch (error) {
    console.error("Erro ao criar o hash:", error.message);
    return null;
  }
}

// Função para verificar uma senha com o hash
export function consultarHash(senha, hash) {
  try {
    const res = bcrypt.compareSync(senha, hash); // Sincronizado
    console.log("Senha:", senha);
    console.log("Hash:", hash);
    console.log("Resultado da Comparação:", res);
    return res;
  } catch (error) {
    console.error("Erro ao verificar o hash:", error.message);
    return false;
  }
}

// Exporta as funções como padrão
export default {
  criarHash,
  consultarHash,
};
