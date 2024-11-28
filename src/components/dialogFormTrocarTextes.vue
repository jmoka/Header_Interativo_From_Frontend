<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn max-width="80" size="small" v-bind="activatorProps">
          <span class="mx-3">{{ title }}</span>
          <span>
            <svg-icon type="mdi" :path="icones"></svg-icon>
          </span>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <!-- Ajuste no botão de fechar -->
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Configurar Textos e Títulos</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text variant="text" @click="dialog = false">Salvar</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <h1>Formulário Aqui</h1>
          <v-btn @click="alterar">elterar</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  props: {
    title: {
      type: String,
      required: true, // Adicione `required` para maior controle
    },
    icones: {
      type: String,
      required: true,
    },
  },
  components: {
    SvgIcon,
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  methods: {
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        // Verifica se o valor é nulo antes de usar
        if (db) {
          let dbAtualizado = { ...JSON.parse(db), textoAba1: "suely" };
          localStorage.setItem("dbConfig", JSON.stringify(dbAtualizado));
          console.log("Configuração atualizada:", dbAtualizado);
        } else {
          console.warn("Nenhum dado encontrado no localStorage.");
        }
      } catch (error) {
        console.error("Erro ao alterar as configurações:", error);
      }
    },
  },
};
</script>
