import { createRouter, createWebHashHistory } from 'vue-router';

// Importando componentes
import HomeView from '../views/index.vue'; // Certifique-se de que o caminho está correto
import SobreView from '../views/sobre.vue';
import ContatosView from '../views/contatos.vue';
import LoginView from '../views/dialogFormLogin.vue';

// Configurando as rotas
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sobre', name: 'sobre', component: SobreView },
  { path: '/contato', name: 'contato', component: ContatosView },
  { path: '/login', name: 'login', component: LoginView },
];

// Criando o router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
