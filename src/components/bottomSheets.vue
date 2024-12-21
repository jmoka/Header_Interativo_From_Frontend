<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn v-bind="props" :color="colorIconeMenu" size="x-large"> Menu </v-btn>
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
import {
  mdiAccountBoxEditOutline,
  mdiAccount,
  mdiCardAccountMail,
  mdiInformation,
  mdiMenu,
} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  props: {
    colorIconeMenu: {
      type: String,
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
      const resultado = confirm(
        "Você tem certeza que deseja restaurar as configurações do seu site?"
      );
      if (resultado) {
        alert("Vamos Restaurar Click em OK.");
        localStorage.removeItem("dbConfig");
        localStorage.removeItem("caminhoLogo");
        localStorage.removeItem("logoVisible");
        localStorage.removeItem("opcao");
        localStorage.removeItem("opcao1");
        localStorage.removeItem("opcao2");
        localStorage.removeItem("opcao3");
        localStorage.removeItem("opcao4");
        localStorage.removeItem("opcao5");
        localStorage.removeItem("localStorageVisibleText");
        localStorage.removeItem("localStorageCorTexto");
        localStorage.removeItem(" localStorageVisibleTextHome");
        localStorage.removeItem(" localStorageCorTextoHome");
        localStorage.removeItem(" localStorageTextoHome");
        localStorage.removeItem(" localStorageVisibleTextContato");
        localStorage.removeItem(" localStorageCorTextoContato");
        localStorage.removeItem(" localStorageTextoContato");

        location.reload();
      } else {
        alert("Click em OK e Permaneça com a sua Configuração Personalizada.");
      }
    },
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
