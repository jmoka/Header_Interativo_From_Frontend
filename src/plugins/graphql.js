import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

import { DefaultApolloClient } from "@vue/apollo-composable";

// Criar o link HTTP para o servidor GraphQL
const httpLink = createHttpLink({
    uri: "http://localhost:4000", // URL do servidor GraphQL
});

// Configurar o link de autenticação
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});


// Criar instância do Apollo Client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});



// Exportar o Apollo Client para ser usado na aplicação
export default {
    install(app) {
        app.provide(DefaultApolloClient, apolloClient);
    },
};
