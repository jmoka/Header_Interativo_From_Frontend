<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn v-bind="props" v-if="menuVisivel" :color="colorIconeMenu" size="x-large">
          Menu
        </v-btn>
      </div>
    </template>

    <v-list>
      <v-list-subheader>Configurações do Site</v-list-subheader>
      <v-list-item v-for="(tile, index) in tiles" :key="index">
        <!-- Dialogo de Trocar Textos -->
        <DialogFormTrocarTextes
          v-if="tile.visible && tile.title === Titulos"
          :title="tile.text"
          :icones="tile.icones"
        />
        <!-- Dialogo de Trocar Textos -->
        <DialogTrocarLogo
          v-if="tile.visible && tile.title === Logo"
          :title="tile.text"
          :icones="tile.icones"
        />
      </v-list-item>
    </v-list>
    <v-btn color="red" class="text-whit" @click="reset">Restaurar</v-btn>
  </v-bottom-sheet>
</template>

<script>
import DialogFormTrocarTextes from "../../src/components/textosTitulos/index.vue";

import DialogTrocarLogo from "./dialogTrocarLogo_.vue";
import { mdiAccountBoxEditOutline, mdiInformation } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { request, gql } from "graphql-request";

export default {
  props: {
    colorIconeMenu: {
      type: String,
      default: "red",
    },
    menuVisivel: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DialogFormTrocarTextes,
    DialogTrocarLogo,
    SvgIcon,
  },
  data() {
    return {
      sheet: false,
      Titulos: "Titulos",
      Icones: "Icones",
      Cores: "Cores",
      Imagem: "Imagens",
      Logo: "Logo",

      tiles: [
        {
          title: "Titulos",
          text: "Títulos",
          icones: mdiAccountBoxEditOutline,
          visible: true,
        },
        {
          title: "Logo",
          text: "Logo",
          icones: mdiInformation,
          visible: true,
        },
      ],
    };
  },
  methods: {
    reset() {
      // Log aqui antes do redirecionamento
      window.location.href = "/";
      localStorage.removeItem("token");
      localStorage.setItem("reset", "true");
      window.location.reload();
    },
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
