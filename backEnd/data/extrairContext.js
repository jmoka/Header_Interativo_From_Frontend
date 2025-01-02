import  jwt from 'jsonwebtoken';
import fs from "fs"
import path from "path";

const pdPath = path.resolve("./padraoConfig.json");

const dadosPadrao = fs.readFileSync(pdPath); 
const dadosPadaoJSON = JSON.parse(dadosPadrao)
const SEGREDO_JWT = dadosPadaoJSON.login["devHash"]
// console.log("dadosLogin ", SEGREDO_JWT);

export function extrairTokenContext(ctx) {
    console.log("Iniciando extrairTokenContext");
    if (!ctx || !ctx.req || !ctx.req.headers) {
        console.log("Contexto ou requisição não encontrados");
        throw new Error("Requisição inválida ou contexto não disponível");
    }
    const authHeader = ctx.req.headers.authorization; // salva no header do autorization
    if (!authHeader) {
        console.log("Cabeçalho de autorização não encontrado");
        throw new Error("Token não encontrado");
    }
    const token = authHeader.replace('Bearer ', ''); // cria uma variavel que armazena o valor do token extraido do header
    if (!token) {
        throw new Error("Token não encontrado após 'Bearer'");
    }
    return token;
}

export function extrairDecoded(token) {

    if (!SEGREDO_JWT) {
        console.log("Segredo JWT não definido");
        throw new Error("Configuração inválida do servidor");
    }
    try {
        const decoded = jwt.verify(token, SEGREDO_JWT);
        return decoded;
    } catch (err) {
        console.log("Erro ao decodificar o token:", err.message);
        throw new Error("Token inválido");
    }
}

export function extrairObjDecoder(ctx) {
    const token = extrairTokenContext(ctx);
    const decodedExtraido = extrairDecoded(token);
    return decodedExtraido;
}
export default {
    extrairObjDecoder,
    extrairDecoded,
    extrairTokenContext

}