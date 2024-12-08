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
          <v-btn v-if="!visiveBtnlSalvar" icon @click="dialog = false">
            <svg-icon :color="red" type="mdi" :path="mdiArrowLeftCircle" />
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

        <v-container fluid>
          <v-row>
            <v-col cols="7">
              <v-sheet class="mx-auto w-100 pa-16">
                <h3>Caminho da Logo</h3>
                <v-form @submit.prevent="alterar">
                  <v-text-field
                    max-width="w-100"
                    v-model="caminhoLogo"
                    label="Logo"
                  ></v-text-field>
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
            </v-col>
            <v-col>
              <div class="pr-16">
                <h1>Informe o caminho de duas formas:</h1>
                <br />
                <h5>HTML</h5>
                <p>https://</p>
                <br />
                <br />
                <h5>CAMINHO LOCAL</h5>
                <p>Abra do ditetório do sistema e procure pela pasta "public"</p>
                <p>Salve sua imagem</p>
                <p>informe o nome e o tipo : Ex: logo.webp</p>
              </div>
            </v-col>
          </v-row>
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
      caminhoLogo: "" || "https://via.placeholder.com/300x70",
      dialog: false, // Controle do diálogo
      LogoVisible: true, // Controle do switch
      iconeAba1Visivel: false, // Visibilidade do ícone adicional
      visiveBtnlSalvar: false, // Controle do botão "Salvar"
      colorSalvar: "blue", // Cor do botão salvar
      bg: "", // Classe de fundo do botão
      colorIcone: "green", // Cor do ícone no switch
      mdiArrowLeftCircle,
    };
  },
  methods: {
    acaobtnVisivel() {
      localStorage.setItem("logoVisible", JSON.stringify(this.LogoVisible));
      localStorage.setItem("caminhoLogo", JSON.stringify(this.caminhoLogo));
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

        if (this.caminhoLogo) {
          dbAtualizado.logo = this.caminhoLogo;
        }
        dbAtualizado.logo = this.caminhoLogo;
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
