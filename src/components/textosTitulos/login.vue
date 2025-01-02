<template>
  <!-- =========================================== -->
  <!-- Login -->
  <!-- =========================================== -->

  <v-btn
    class="mb-3"
    :height="auto"
    :width="'100%'"
    border
    rounded
    :elevation="8"
    @click="toggleConfig"
    :text="label"
  ></v-btn>
  <v-sheet class="d-flex justify-center text-center rounded-lg">
    <div v-if="config">
      <v-text-field
        class="mt-5 mx-3"
        v-model="text"
        :label="label_"
        variant="solo-inverted"
      />
      <v-span class="d-flex mx-3">
        <v-row>
          <v-col cols="4">
            <h5 class="mx-2">{{ textOcutarTexto }}</h5>
            <v-switch
              v-model="visivelText"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
          <v-col cols="4"
            ><h5 class="mx-2">{{ textOcutarIcone }}</h5>
            <v-switch
              v-model="iconeVisible_"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
          <v-col cols="4"
            ><h5 class="mx-2">{{ textOcutarBorda }}</h5>
            <v-switch
              v-model="borderVisible_"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
        </v-row>
      </v-span>
      <v-row>
        <v-col cols="6">
          <v-btn class="elevation-10" @click="ColoVisibleText">{{ textCorText }}</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="elevation-10" @click="ColoVisibleIcone">{{ textCorIcone }}</v-btn>
        </v-col>
      </v-row>
      <v-card class="my-5" v-if="coloVisibleText">
        <span v-if="barra" :style="{ backgroundColor: corTexto }">
          {{ textCorText }} : {{ corTexto }}
        </span>
        <v-color-picker
          v-if="coloVisibleText"
          v-model="corTexto"
          @click="MetodoBarra"
          mode="hexa"
          show-swatches
          hide-inputs
          hide-sliders
          hide-canvas
        />
      </v-card>

      <v-card class="my-5" v-if="coloVisibleIcone">
        <span v-if="barra" :style="{ backgroundColor: colorIcone }">
          Cor do Icone : {{ colorIcone }}
        </span>
        <v-color-picker
          v-model="colorIcone"
          @click="MetodoBarra"
          mode="hexa"
          show-swatches
          hide-inputs
          hide-sliders
          hide-canvas
        />
      </v-card>

      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-row>
            <v-col class="mx-3 mb-2">
              <v-btn
                v-bind="props"
                :color="isHovering ? 'primary' : undefined"
                style="border: 1px solid"
                @click="alterar"
                type="btn"
                block
              >
                Confirmar
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-hover>
    </div>
  </v-sheet>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHomeAccount } from "@mdi/js";

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
      textOcutarTexto: "Ocultar Texto",
      textOcutarIcone: "Ocultar Icone",
      textOcutarBorda: "Ocultar Bordar",
      textCorText: "Cor do Texto",
      textCorIcone: "Cor do Icone",

      db: {},
      borderVisible_: false,
      border_: "border:1px solid",
      coloVisibleText: false,
      coloVisibleIcone: false,
      label_: "Texto Conatato",
      iconeVisible_: true,
      config: false,
      barra: false,
      visivelText: true,
      text: "",
      corTexto: "#ffff",
      iconeSalvar: false,
      colorIcone: "green",
      icone: mdiHomeAccount,
      size: 50,
      label: "Login",
      colorVisivelTrue: "green",
      colorVisivelFalse: "red",
      colorSalvar: "white",
      bg: "bg-blue",
      dialog: false,
    };
  },

  methods: {
    logar() {
      const LOGIN_MUTATION = gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `;
    },

    ColoVisibleText() {
      this.coloVisibleText = !this.coloVisibleText;

      this.coloVisibleIcone = false;
    },
    ColoVisibleIcone() {
      this.coloVisibleIcone = !this.coloVisibleIcone;
      this.coloVisibleText = false;
    },

    toggleConfig() {
      this.config = !this.config;
    },
    MetodoBarra() {
      this.barra = true;
    },

    saveToLocalStorage() {
      localStorage.setItem("dbConfig", JSON.stringify(this.db));
    },

    acao() {
      if (this.visivelText) {
        this.visivelText;
      } else {
        this.label_ = "Texto Login ";
      }

      this.saveToLocalStorage();
    },

    alterar() {
      // startsWith =   verificar se uma string começa com uma sequência específica de caracteres

      // ALTERA A COR
      if (!this.corTexto.startsWith("color:")) {
        this.db.login.colorText = "color:" + this.corTexto; // Adiciona "color:" apenas se necessário
      } else {
        this.db.login.colorText = this.corTexto; // Usa o valor atual
      }
      // ALTERA A BORDAR
      if (this.borderVisible_) {
        this.db.login.borderVisible = this.borderVisible_;
        this.db.login.border = this.border_;
        console.log(this.db.login.border);
      } else {
        this.db.login.borderVisible = this.borderVisible_;
        this.db.login.border = null;
      }

      this.db.login.iconeVisible = this.iconeVisible_; // ALTERA A VISIBILIDADE  ICONE
      this.db.login.colorIco = this.colorIcone; // ALTERA A COR DO ICONE
      this.db.login.icone = this.icone; // ALTERA O ICONE
      this.db.login.textVisible = this.visivelText; // ALTERA A VISIBILIDADE
      this.db.login.texto = this.text; // ALTERA O TEXTO

      // CRIA UM EVENTO CHAMADO ALTERADO COM VALOR TRUE
      this.$emit("alterado", true);

      // SALVA AS ALTERAÇÕES NO LOCAL STORAGE
      this.saveToLocalStorage();
    },
  },

  mounted() {
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {};
    this.visivelText = this.db.login.textVisible ?? true; // INICIALIZA O CAMPO VISIVEL TEXTO
    this.iconeVisible_ = this.db.login.iconeVisible; // INICILIZA A VISIBILIDADE DO ICONE
    this.text = this.db.login.texto ?? ""; // INICIALIZA O CAMPO TEXTO
    this.corTexto = this.db.login.colorText; // INICIALIZA O COR TEXTO

    this.icone = this.db.login.icone; // INICIALIZA O ICONE
    this.colorIcone = this.db.login.colorIco;
    this.borderVisible_ = this.db.login.borderVisible;
  },
};
</script>
