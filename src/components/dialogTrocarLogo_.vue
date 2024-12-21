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

      <v-card :class="bgfull">
        <v-toolbar>
          <v-btn v-if="!visiveBtnlSalvar" icon @click="dialog = false">
            <svg-icon color="red" type="mdi" :path="mdiArrowLeftCircle" />
          </v-btn>

          <v-toolbar-title>{{ titulo }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            v-if="visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
          >
            {{ Salvar }}
          </v-btn>
        </v-toolbar>

        <!--  CAMINHO DA LOGO -->
        <v-container fluid class="mt-12 mx-12">
          <v-row>
            <v-col cols="12" md="6">
              <v-sheet class="mx-auto w-100 pa-5">
                <h3>{{ textoCaminhoLogo }}</h3>
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

                  <!-- LOGO VISIVEL -->
                  <h3>{{ logoVisivel }}</h3>
                  <v-switch
                    v-model="logoVisible_"
                    @change="acao"
                    color="green"
                    base-color="red"
                  ></v-switch>

                  <!-- BARRA TRANSPARENTE -->
                  <h3>{{ textBarra }}</h3>
                  <v-switch
                    v-model="opcaoBarraTransparente"
                    @change="acao"
                    color="green"
                    base-color="red"
                  ></v-switch>

                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-row>
                        <v-col class="mx-3 mb-2">
                          <v-btn
                            v-bind="props"
                            :color="isHovering ? 'primary' : undefined"
                            style="border: 1px solid"
                            type="submit"
                            block
                          >
                            {{ confirma }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                  </v-hover>
                </v-form>
              </v-sheet>
            </v-col>

            <v-col cols="12" md="6">
              <div class="pr-16">
                <h1>Informe o caminho de duas formas:</h1>
                <br />
                <h5>HTML</h5>
                <p>https://via.placeholder.com/300x70</p>
                <br /><br />
                <h5>CAMINHO LOCAL</h5>
                <p>Abra o diretório do sistema e procure pela pasta "public"</p>
                <p>Salve sua imagem</p>
                <p>Informe o nome e o tipo: Ex: logo.webp</p>
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
import { mdiArrowLeftCircle, mdiHandOkay } from "@mdi/js";

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
      db: {},
      opcaoBarraTransparente: false,
      transparencia: "",
      confirma: "Confirmar",
      textBarra: "Header Transparente",
      logoVisivel: "Logo Visível",
      textoCaminhoLogo: "Caminho da Logo",
      Salvar: "Salvar",
      titulo: "Configurar Logo e Barra",
      transparente: "bg-transparent",
      bgfull: "bg-black",
      opcaoBarraTransparente: false,
      caminhoLogo: "",
      dialog: false, // Controle do diálogo
      logoVisible_: true, // Controle do switch
      iconeAba1Visivel: false, // Visibilidade do ícone adicional
      visiveBtnlSalvar: false, // Controle do botão "Salvar"
      colorSalvar: "blue", // Cor do botão salvar
      bg: "", // Classe de fundo do botão
      colorIcone: "green", // Cor do ícone no switch
      mdiArrowLeftCircle,
      mdiHandOkay,
    };
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("dbConfig", JSON.stringify(this.db));
    },

    acao() {
      console.log("ação ok");
    },

    salvar() {
      location.reload(); // Recarrega a página para aplicar as alterações
    },

    alterar() {
      if (this.logoVisible_) {
        this.db.logo.logoVisible = this.logoVisible_;
      } else {
        this.db.logo.logoVisible = this.logoVisible_;
      }

      if (this.opcaoBarraTransparente) {
        this.transparencia = "bg-transparent";
        this.db.header.color = this.transparencia;
        this.db.header.tansparente = this.opcaoBarraTransparente;
      } else {
        this.transparencia = "bg-black";
        this.db.header.color = this.transparencia;
        this.db.header.tansparente = this.opcaoBarraTransparente;
      }

      this.db.logo.logotipo = this.caminhoLogo;
      this.visiveBtnlSalvar = true;
      this.colorSalvar = "white";
      this.bg = "bg-green";
      this.saveToLocalStorage();
    },
  },
  mounted() {
    // PEGA O LOCALSTORAGE E ATRIBUI A THIS.DB
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {};
    this.logoVisible_ = this.db.logo.logoVisible;
    this.caminhoLogo = this.db.logo.logotipo;
    this.db.header.color = this.transparencia;
    this.opcaoBarraTransparente = this.db.header.tansparente;
  },
};
</script>
