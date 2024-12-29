import { extrairDecoded } from "./extrairContext.js";

export default async ({ req }) => {
  // Setando o authorization
  const auth = req.headers.authorization;

  // Inicializando variáveis
  let usuario = null;
  //  let perfilSetado = false;

  // pega o toquem e retira os 7 primeiros caracteres
  const token = auth && auth.substring(7);

  if (token) {
    try {
      const conteudoToken = extrairDecoded(token);
      const agora = new Date().getTime();
      const validadeToken = conteudoToken.exp * 1000; // transforma a milisegundos

      // Verificando a validade do token
      if (validadeToken > agora) {
        usuario = conteudoToken;
      }
    } catch (error) {
      // Token inválido
      console.error("Erro ao extrair token:", error.message);
    }
  }

  // Verificando se o perfil está setado
  // if (usuario && ["mast", "dev", "admin"].includes(usuario.perfil.nome)) {
  //     perfilSetado = usuario.perfil.nome;
  // }

  // Error de acesso negado
  // const err = new Error("Acesso Negado");

  return {
    usuario,
  };
};
