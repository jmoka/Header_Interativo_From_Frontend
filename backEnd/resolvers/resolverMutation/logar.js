import { logado } from "../../data/fs.js";

export function logar(user, email, senha) {
  return logado(user, email, senha);
}

export default {
  logar,
};
