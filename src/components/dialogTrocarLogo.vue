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
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Configurar Logo e Barra</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            v-if="visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
          >
            Salvar
          </v-btn>
        </v-toolbar>

        <v-container>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="alterar">
              <v-text-field v-model="textHome" label="Logo"></v-text-field>
              <svg-icon
                :color="colorIcone"
                v-if="iconeAba1Visivel"
                type="mdi"
                :path="mdiHandOkay"
                size="50"
              />
              <v-switch
                v-model="LogoVisible"
                @change="acaobtnVisivel"
                color="green"
                base-color="red"
              >
              </v-switch>

              <v-btn class="mt-2" type="submit" block>Alterar</v-btn>
            </v-form>
          </v-sheet>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHandOkay, mdiArrowLeftCircle } from "@mdi/js";

export default {
  props: {
    title: {
      type: String,
      required: true,
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
      dialog: false, // Controle do diálogo
      textHome: "", // Input para o campo "Logo"
      LogoVisible: true, // Controle do switch
      iconeAba1Visivel: false, // Visibilidade do ícone adicional
      visiveBtnlSalvar: false, // Controle do botão "Salvar"
      colorSalvar: "blue", // Cor do botão salvar
      bg: "", // Classe de fundo do botão
      colorIcone: "green", // Cor do ícone no switch
    };
  },
  methods: {
    acaobtnVisivel() {
      localStorage.setItem("logoVisible", JSON.stringify(this.LogoVisible));
    },
    salvar() {
      location.reload(); // Recarrega a página para aplicar as alterações
    },
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        let dbAtualizado = db ? JSON.parse(db) : {};

        if (this.LogoVisible) {
          dbAtualizado.logoVisible = this.LogoVisible;
        }

        dbAtualizado.logoVisible = this.LogoVisible;
        localStorage.setItem("dbConfig", JSON.stringify(dbAtualizado));
        this.visiveBtnlSalvar = true;
        this.colorSalvar = "white";
        this.bg = "bg-green";
      } catch (error) {
        console.error("Erro ao alterar as configurações:", error);
      }
    },
  },
  mounted() {
    const opcaoArmazenada = localStorage.getItem("logoVisible");
    this.LogoVisible = opcaoArmazenada ? JSON.parse(opcaoArmazenada) : true;
  },
};
</script>
