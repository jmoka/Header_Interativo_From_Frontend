import { createApp } from "vue";
import App from "./App.vue";
import apolloPlugin from "./plugins/graphql"; // Caminho correto do seu plugin
import vuetify from "./plugins/vuetify";
import router from "./router";

// Criar a aplicação Vue e registrar o Apollo Client
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(apolloPlugin);  // Usar o plugin Apollo

app.mount("#app");
