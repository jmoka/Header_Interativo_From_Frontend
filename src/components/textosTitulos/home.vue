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
  <v-sheet class="d-flex justify-center text-center">
    <div v-if="config">
      <v-text-field
        class="mt-5 mx-3"
        v-model="text"
        label="Texto Home"
        variant="solo-inverted"
      />
      <v-span class="px-6 pt-5 mb-0 w-'100%'">
        <span v-if="barra" :style="{ backgroundColor: corTexto }">
          {{ corTexto }}
        </span>
      </v-span>
      <v-color-picker
        v-model="corTexto"
        @click="MetodoBarra"
        mode="hexa"
        show-swatches
        hide-inputs
        hide-sliders
        hide-canvas
      />
      <v-span class="d-flex my-3 mx-3">
        <h5>Texto</h5>
        <v-switch
          v-model="visivel_text"
          @change="acao"
          :color="colorVisivelTrue"
          :base-color="colorVisivelFalse"
        />

        <v-span class="px-12 pt-5">
          <p v-if="!visivel_text_Oculto_Visivel">Oculto</p>
          <p v-if="visivel_text_Oculto_Visivel">Visível</p>
        </v-span>
      </v-span>
      <v-span class="d-flex mx-3">
        <h5>Icone</h5>
        <v-switch
          v-model="iconeHomeVisible"
          @change="acao"
          :color="colorVisivelTrue"
          :base-color="colorVisivelFalse"
        />

        <v-span class="px-12 pt-5">
          <p v-if="!visivel_icone_Oculto_Visivel">Oculto</p>
          <p v-if="visivel_icone_Oculto_Visivel">Visível</p>
        </v-span>
      </v-span>
      <!-- <v-select
        v-model="icone"
        class="mx-4"
        label="Select"
        :items="listaicones"
      ></v-select> -->

      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-btn
            v-bind="props"
            :color="isHovering ? 'primary' : undefined"
            class="mb-3"
            @click="alterar"
            type="btn"
            block
          >
            Confirmar
          </v-btn>
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
      iconeHomeVisible: true,
      config: false,
      barra: false,
      visivel_text_Oculto_Visivel: true,
      visivel_text: true,
      visivel_icone_Oculto_Visivel: true,
      visivel_icone_Oculto_Visivel: true,
      text: "",
      corTexto: "#000000",
      iconeSalvar: false,
      colorIcone: "green",
      icone: mdiHomeAccount,
      size: 50,
      label: "Home",
      colorVisivelTrue: "green",
      colorVisivelFalse: "red",

      visiveBtnlSalvar: false,
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
      this.visivel_text_Oculto_Visivel = this.visivel_text;

      this.saveToLocalStorage();
    },

    alterar() {
      // console.log(this.icone);
      this.db.icohome = this.icone; // ALTERA O ICONE
      this.db.textVisibleHome = this.visivel_text; // ALTERA A VISIBILIDADE
      this.db.colorTextHome = "color:" + this.corTexto; // ALTERA A COR DO TEXTO
      this.db.textoHome = this.text; // ALTERA O TEXTO
      this.saveToLocalStorage();
      this.visiveBtnlSalvar = true;
      this.$emit("alterado", true);
    },
  },

  mounted() {
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {};
    this.visivel_text = this.db.textVisibleHome ?? true; // INICIALIZA O CAMPO VISIVEL TEXTO
    this.text = this.db.textoHome ?? ""; // INICIALIZA O CAMPO TEXTO
    this.corTexto = this.db.colorText; // INICIALIZA O CAMPO COR TEXTO
    this.db.icohome = this.icone; // INICIALIZA O ICONE
  },
};
</script>
