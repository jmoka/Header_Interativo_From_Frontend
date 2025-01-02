
// Vuetify
import 'vuetify/styles'; // Importa os estilos do Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configuração do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Define o tema padrão (opcional)
  },
});

export default vuetify

