import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
// Importe os resolvers
import resolvers from "./resolvers/index.js";
import { atualizarDbconfg, pdPathCriar, deleteDbConfig } from "./data/fs.js";
import AllType from "./resolvers/scalars/AllType.js"; // Importar o tipo escalar

// Defina o caminho para o seu arquivo de esquema
const schemaPath = "./schema/index.graphql";

// Carregue o esquema usando @graphql-tools
const typeDefs = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

pdPathCriar();
// deleteDbConfig();
// atualizarDbconfg();

// Importe o contexto
// import context from './data/context.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  AllType,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server pronto em ${url}`);
