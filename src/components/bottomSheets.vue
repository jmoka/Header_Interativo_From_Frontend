<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn v-bind="props" :color="colorIconeMenu" size="x-large"> Menu </v-btn>
      </div>
    </template>

    <v-list>
      <v-list-subheader>Configurações do Site</v-list-subheader>
      <v-list-item v-for="tile in tiles" :key="tile.title">
        <!-- Dialogo de Trocar Textos -->
        <DialogFormTrocarTextes
          v-if="tile.visible && tile.title === Perfil"
          :title="tile.text"
          :icones="tile.icones"
        />

        <!-- Dialogo de Trocar Imagens -->
        <DialogTrocarImagem
          v-else-if="tile.visible && tile.title === Imagens"
          :title="tile.text"
          :icones="tile.icones"
        />

        <DialogTrocarIcones
          v-else-if="tile.visible && tile.title === Icons"
          :title="tile.text"
          :icones="tile.icones"
        />
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import DialogFormTrocarTextes from "../../src/components/DialogFormTrocarTextes.vue";
import DialogTrocarImagem from "../../src/components/DialogTrocarImagem.vue";
import DialogTrocarIcones from "../../src/components/dialogTrocarIcones.vue";
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
    DialogTrocarImagem,
    DialogTrocarIcones,
    SvgIcon,
  },
  data() {
    return {
      sheet: false,
      Perfil: "Perfil",
      Textos: "Textos",
      Imagem: "Imagens",
      Icone: "Icons",

      tiles: [
        {
          title: "Perfil",
          text: "Perfil",
          icones: mdiAccount,
          visible: true,
        },
        {
          title: this.Textos,
          icones: mdiAccountBoxEditOutline,
          text: "Textos",
          visible: true,
        },
        {
          title: this.Imagem,
          text: "Imagens",
          icones: mdiAccount,
          visible: true,
        },
        {
          title: this.Icone,
          text: "Icones",
          icones: mdiCardAccountMail,
          visible: true,
        },
        {
          title: "Messenger",
          text: "Redes",
          icones: mdiInformation,
          visible: true,
        },

        {
          img: "google.png",
          title: "Google+",
          text: "Trocar",
          icones: mdiMenu,
          visible: true,
        },
      ],
    };
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
