<template>
  <!-- =========================================== -->
  <!-- LOGIN -->
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
        class="mt-5"
        variant="solo-inverted"
        label="Texto Login"
        v-model="text"
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
      <v-span class="m-3 d-flex my-3">
        <h5 class="mx-2">Texto</h5>
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
      <v-span class="d-flex">
        <h5 class="mx-2">Icone</h5>
        <v-switch
          v-model="iconeLoginVisible"
          @change="acao"
          :color="colorVisivelTrue"
          :base-color="colorVisivelFalse"
        />

        <v-span class="px-12 pt-5">
          <p v-if="!visivel_text_Oculto_Visivel">Oculto</p>
          <p v-if="visivel_text_Oculto_Visivel">Visível</p>
        </v-span>
      </v-span>
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
import { mdiHandOkay } from "@mdi/js";

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
      iconeLoginVisible: true,
      config: false,
      barra: false,
      visivel_text_Oculto_Visivel: true,
      visivel_text: true,
      text: "",
      corTexto: "#000000",
      iconeSalvar: false,
      colorIcone: "green",
      icone: mdiHandOkay,
      size: 50,
      label: "Login",
      colorVisivelTrue: "green",
      colorVisivelFalse: "red",

      visiveBtnlSalvar: false,
      colorSalvar: "white",
      bg: "bg-blue",
      dialog: false,
    };
  },

  methods: {
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
      this.db.textLoginVisible = this.visivel_text; // ALTERA A VISIBILIDADE
      this.db.colorTextLogin = "color:" + this.corTexto; // ALTERA A COR DO TEXTO
      this.db.textLogin = this.text; // ALTERA O TEXTO
      this.saveToLocalStorage();
      this.visiveBtnlSalvar = true;
      this.$emit("alterado", true);
    },
  },

  mounted() {
    const storedDb = localStorage.getItem("dbConfig");
    this.db = storedDb ? JSON.parse(storedDb) : {};
    this.visivel_text = this.db.textLoginVisible ?? true; // INICIALIZA O CAMPO VISIVEL TEXTO
    this.text = this.db.textLogin ?? ""; // INICIALIZA O CAMPO TEXTO
    this.corTexto = this.db.colorTextLogin; // INICIALIZA O CAMPO COR TEXTO
  },
};
</script>
