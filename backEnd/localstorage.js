import fs from 'fs';
import path from 'path';


// Função para criar o arquivo de configuração
export function createConfigFile() {
    // Caminho para os arquivos
    const dbPath = path.resolve('./dbConfig.json');
    const padraoPath = path.resolve('./pdConfig.json');
  
    try {
      // Verifica se o arquivo padrão existe
      if (!fs.existsSync(padraoPath)) {
        console.error('Arquivo padrão padraoConfig.json não encontrado!');
        return;
      }
  
      // Lê os dados do arquivo padrão
      const padrao = JSON.parse(fs.readFileSync(padraoPath, 'utf8'));
  
      // Verifica se o arquivo de configuração existe
      if (!fs.existsSync(dbPath)) {
        // Cria o arquivo de configuração com os dados padrão
        fs.writeFileSync(dbPath, JSON.stringify(padrao, null, 2));
        console.log('Arquivo dbConfig.json criado com os dados padrão.');
      } else {
        console.log('Arquivo dbConfig.json já existe.');
      }
    } catch (error) {
      console.error('Erro ao criar ou verificar o arquivo dbConfig.json:', error.message);
    }
  }
  
  // Executa a criação do arquivo de configuração
  createConfigFile();
// ========================================================================


// Função para salvar um item
export function setItem(key, value) {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8')); // Lê o arquivo existente
  data[key] = value; // Atualiza os dados com a nova chave e valor
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // Salva as alterações
  console.log(`Item salvo: ${key} =`, value);
}

// Função para carregar um item
export function getItem(key) {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8')); // Lê o arquivo existente
  return data[key] || null; // Retorna o valor associado à chave ou null
}

// Função para remover um item
export function removeItem(key) {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8')); // Lê o arquivo existente
  delete data[key]; // Remove a chave especificada
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // Salva as alterações
  console.log(`Item removido: ${key}`);
}

// Exemplo de uso
setItem('novoItem', { exemplo: 'valorExemplo' }); // Adiciona um novo item
console.log('Item carregado:', getItem('novoItem')); // Carrega o item
removeItem('novoItem'); // Remove o item
createConfigFile();