<template>
  <!-- =========================================== -->
  <!-- HOME -->
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
        :label="labelHome"
        variant="solo-inverted"
      />
      <v-span class="d-flex mx-3">
        <v-row>
          <v-col cols="4">
            <h5 class="mx-2">Ocultar Texto</h5>
            <v-switch
              v-model="visivel_text"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
          <v-col cols="4"
            ><h5 class="mx-2">Ocultar Icone</h5>
            <v-switch
              v-model="iconeHomeVisible"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
          <v-col cols="4"
            ><h5 class="mx-2">Ocultar Bordar</h5>
            <v-switch
              v-model="borderHomeVisible"
              @change="acao"
              :color="colorVisivelTrue"
              :base-color="colorVisivelFalse"
          /></v-col>
        </v-row>
      </v-span>
      <v-row>
        <v-col cols="6">
          <v-btn class="elevation-10" @click="ColoVisibleText">Cor Texto</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="elevation-10" @click="ColoVisibleIcone">Cor Icone</v-btn>
        </v-col>
      </v-row>
      <v-card class="my-5" v-if="coloVisibleText">
        <span v-if="barra" :style="{ backgroundColor: corTexto }">
          Cor do Texto : {{ corTexto }}
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
import {
  mdiAccount,
  mdiHomeAccount,
  mdiCardAccountMail,
  mdiInformation,
  mdiWhatsapp,
  mdiMenu,
  mdiFormatLineStyle,
  mdiHandOkay,
} from "@mdi/js";

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
      // listaicones: [
      //   "mdiAccount",
      //   "mdiHomeAccount",
      //   "mdiCardAccountMail",
      //   "mdiInformation",
      //   "mdiWhatsapp",
      //   "mdiMenu",
      //   "mdiFormatLineStyle",
      //   "mdiHandOkay",;
      // ],
      borderHomeVisible: false,
      coloVisibleText: false,
      coloVisibleIcone: false,
      labelHome: "Texto Home",
      iconeHomeVisible: true,
      config: false,
      barra: false,
      //visiveBtnlSalva: true,

      visivel_text: true,

      text: "",

      corTexto: "#ffff",
      iconeSalvar: false,
      colorIcone: "green",
      icone: mdiHomeAccount,
      size: 50,
      label: "Home",
      colorVisivelTrue: "green",
      colorVisivelFalse: "red",

      colorSalvar: "white",
      bg: "bg-blue",
      dialog: false,
    };
  },

  methods: {
    // element() {
    //   if (this.listaicones === "mdiAccount") return this.$refs.mdiAccount;
    //   else if (this.listaicones === "mdiHomeAccount") return this.$refs.mdiHomeAccount;
    //   else if (this.listaicones === "mdiCardAccountMail")
    //     return this.$refs.mdiCardAccountMail;
    //   else if (this.listaicones === "mdiInformation") return this.$refs.mdiInformation;
    //   else if (this.listaicones === "mdiWhatsapp") return this.$refs.mdiWhatsapp;
    //   else if (this.listaicones === "mdiMenu") return this.$refs.mdiMenu;
    //   else if (this.listaicones === "mdiFormatLineStyle")
    //     return this.$refs.mdiFormatLineStyle;
    //   else if (this.listaicones === "mdiHandOkay") return this.$refs.mdiHandOkay;
    //   else return null;
    // },
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
      if (this.visivel_text) {
        this.visivel_text;
      } else {
        this.labelHome = "Texto Home ";
      }
      this.saveToLocalStorage();
    },

    alterar() {
      // console.log(this.icone);
      // startsWith =   verificar se uma string começa com uma sequência específica de caracteres
      if (!this.corTexto.startsWith("color:")) {
        this.db.home.colorTextHome = "color:" + this.corTexto; // Adiciona "color:" apenas se necessário
      } else {
        this.db.home.colorTextHome = this.corTexto; // Usa o valor atual
      }

      this.db.home.iconeHomeVisible = this.iconeHomeVisible; // ALTERA A VISIBILIDADE DO ICONE
      this.db.home.icohome = this.icone; // ALTERA O ICONE
      this.db.home.textVisibleHome = this.visivel_text; // ALTERA A VISIBILIDADE

      console.log(this.db.home.colorTextHome);

      this.db.home.textoHome = this.text; // ALTERA O TEXTO
      //this.visiveBtnlSalva = true;
      this.$emit("alterado", true);
      this.saveToLocalStorage();
    },
  },

  mounted() {
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {};
    this.visivel_text = this.db.home.textVisibleHome ?? true; // INICIALIZA O CAMPO VISIVEL TEXTO
    this.iconeHomeVisible = this.db.home.iconeHomeVisible; // INICILIZA A VISIBILIDADE DO ICONE
    this.text = this.db.home.textoHome ?? ""; // INICIALIZA O CAMPO TEXTO
    this.corTexto = this.db.home.colorTextHome; // INICIALIZA O COR TEXTO
    console.log(this.db.home.colorTextHome);
    this.icone = this.db.home.icohome; // INICIALIZA O ICONE
  },
};
</script>
