
import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles'; // Importa os estilos do Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


// Router
import router from './router';
// App Component
import App from './App.vue';
// Configuração do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Define o tema padrão (opcional)
  },
});

// Criação e montagem do aplicativo Vue
createApp(App)
  .use(router) // Registra o Vue Router
  .use(vuetify) // Registra o Vuetify
  .mount('#app'); // Monta a aplicação no elemento com id 'app'


  