import jwt from 'jsonwebtoken';
import fs from "fs"
import path from "path";

const pdPath = path.resolve("./padraoConfig.json");

const dadosPadrao = fs.readFileSync(pdPath); 
const dadosPadaoJSON = JSON.parse(dadosPadrao)
const SEGREDO_JWT = dadosPadaoJSON.login["devHash"]
// console.log("dadosLogin ", SEGREDO_JWT);

const err = new Error("Token inválido ou expirado");

class Token {
    // Método estático para gerar o token JWT
    static gerarToken(dados) {
        const agora = Math.floor(Date.now() / 1000);
        const payload = {
            dev:dados.dev,
            emailDev: dados.emailDev,
            devHash: dados.devHash,
            admin:dados.admin,
            emailAdmin: dados.emailAdmin,
            adminHash: dados.adminHash,
            use:dados.use,
            emailUse: dados.emailUse,
            useHash: dados.useHash,
            iat: agora,
            exp: agora + (1 * 60), // Token válido por 24 horas
            
        };
        
        // Assinar o token com o segredo do servidor, NÃO com a senha do usuário
        const token = jwt.sign(payload, SEGREDO_JWT);
        
        return {
            ...payload,
            token
        };
    }

//     // Método estático para verificar o token JWT
    static verificarToken(token) {
        try {
            const decoded = jwt.verify(token, SEGREDO_JWT);
            return decoded;
        } catch (error) {
            throw err;
        }
    }
}


export default Token;