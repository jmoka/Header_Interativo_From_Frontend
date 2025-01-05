<template>
  <v-toolbar
    :style="{ backgroundColor: dados.header.color }"
    flat
    :image="imagemfundoheader"
    prominent
  >
    <!-- Menu -->
    <bottomSheets
      :menuVisivel="dados.menu.menuVisible"
      :colorIcone="dados.menu.colorIcone"
    />

    <!-- Logo -->
    <v-img
      class="logo"
      v-if="dados.logo.logoVisible"
      :src="dados.logo.logotipo"
      :max-height="dados.logo.altLogo"
      :max-width="dados.logo.lagLogo"
    />

    <!-- Texto Central -->

    <!-- Obsercação -->
    <h4
      class="ml-5"
      v-if="dados.obs.visible"
      :style="dados.obs.colorObs"
      v-text="dados.obs.observacao"
    ></h4>
    <v-spacer></v-spacer>

    <!-- Botões de Navegação -->

    <!-- HOME -->
    <v-btn
      :style="dados.home.border"
      to="/"
      :color="dados.home.colorIco"
      v-if="dados.home.textVisible || dados.home.iconeVisible"
      class="mx-1"
    >
      <svg-icon v-if="dados.home.iconeVisible" type="mdi" :path="dados.home.icone" />
      <h4
        v-if="dados.home.textVisible"
        :style="dados.home.colorText"
        v-text="dados.home.texto"
      />
    </v-btn>

    <!-- CONTATO -->
    <v-btn
      :style="dados.contato.border"
      to="/contato"
      :color="dados.contato.colorIco"
      v-if="dados.contato.textVisible || dados.contato.iconeVisible"
      class="mx-1"
    >
      <svg-icon
        v-if="dados.contato.iconeVisible"
        type="mdi"
        :path="dados.contato.icone"
      />
      <h4
        v-if="dados.contato.textVisible"
        :style="dados.contato.colorText"
        v-text="dados.contato.texto"
      />
    </v-btn>
    <!-- SOBRE -->
    <v-btn
      :style="dados.sobre.border"
      to="/sobre"
      :color="dados.sobre.colorIco"
      v-if="dados.sobre.textVisible || dados.sobre.iconeVisible"
      class="mx-1"
    >
      <svg-icon v-if="dados.sobre.iconeVisible" type="mdi" :path="dados.sobre.icone" />
      <h4
        v-if="dados.sobre.textVisible"
        :style="dados.sobre.colorText"
        v-text="dados.sobre.texto"
      />
    </v-btn>
    <!-- LOGIN -->
    <v-btn
      :style="dados.login.border"
      to="/Login"
      :color="dados.login.colorIco"
      v-if="dados.login.textVisible || dados.login.iconeVisible"
      class="mx-1"
    >
      <svg-icon v-if="dados.login.iconeVisible" type="mdi" :path="dados.login.icone" />
      <h4
        v-if="dados.login.textVisible"
        :style="dados.login.colorText"
        v-text="dados.login.texto"
      />
    </v-btn>

    <!-- WhatsApp -->
    <v-btn
      v-if="dados.whatsapp.Visible"
      icon
      :color="dados.colorIcone"
      :href="linkWhatsapp"
      target="_blank"
      class="mx-1"
    >
      <svg-icon type="mdi" :path="dados.whatsapp.icone" />
    </v-btn>
  </v-toolbar>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiAccount,
  mdiHomeAccount,
  mdiCardAccountMail,
  mdiInformation,
  mdiWhatsapp,
} from "@mdi/js";

import bottomSheets from "../../src/components/bottomSheets.vue";

export default {
  components: {
    SvgIcon,
    bottomSheets,
  },
  data() {
    const dadosRecuperados = JSON.parse(localStorage.getItem("dbConfig"));

    if (dadosRecuperados.home.icone) {
      dadosRecuperados.home.icone = mdiHomeAccount;
    }
    if (dadosRecuperados.contato.icone) {
      dadosRecuperados.contato.icone = mdiCardAccountMail;
    }
    if (dadosRecuperados.sobre.icone) {
      dadosRecuperados.sobre.icone = mdiInformation;
    }
    if (dadosRecuperados.login.icone) {
      dadosRecuperados.login.icone = mdiAccount;
    }
    if (dadosRecuperados.whatsapp.icone) {
      dadosRecuperados.whatsapp.icone = mdiWhatsapp;
    }

    const localData = JSON.stringify(dadosRecuperados);

    return {
      dados: localData
        ? JSON.parse(localData)
        : {
            home: {
              borderVisible: false,
              border: null,
              bg: "",
              texto: "",
              textVisible: true,
              colorText: "",
              colorIco: "",
              icone: mdiHomeAccount,
              iconeVisible: true,
            },
            contato: {
              borderVisible: false,
              border: null,
              bg: "",
              texto: "",
              textVisible: true,
              colorText: "",
              colorIco: "",
              icone: mdiCardAccountMail,
              iconeVisible: true,
            },
            sobre: {
              borderVisible: false,
              border: null,
              bg: "",
              texto: "",
              textVisible: true,
              colorText: "",
              colorIco: "",
              icone: mdiInformation,
              iconeVisible: true,
            },
            login: {
              borderVisible: false,
              border: null,
              bg: "",
              texto: "",
              textVisible: true,
              colorText: "",
              colorIco: "",
              icone: mdiAccount,
              iconeVisible: true,
            },
            whatsapp: {
              icone: mdiWhatsapp,
              numero: "",
              Visible: true,
              colorIcone: "",
            },
            obs: {
              visible: true,
              observacao: "",
              colorObs: "",
            },
            menu: {
              colorIcone: "",
              menuVisible: false,
            },
            logo: {
              logoVisible: true,
              logotipo: "",
              altLogo: "",
              lagLogo: "",
            },
            header: {
              tansparente: false,
              color: "",
              imageHeader: false,
            },
            padrao: true,
          },
    };
  },

  computed: {
    linkWhatsapp() {
      return `https://wa.me/${this.dados.whatsapp.numero}?text=suporte`;
    },
    imagemfundoheader() {
      return this.dados.header.imageHeader
        ? "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        : null;
    },
  },

  methods: {
    formLogin() {
      this.$emit("formLoginVisivel", true);
    },
    salvarConfiguracoes() {
      try {
        // Usando o localStorage nativo para salvar
        // localStorage.setItem("dbConfig", JSON.stringify(this.dados));
      } catch (e) {
        console.error("Erro ao salvar configurações:", e);
      }
    },

    carregarConfiguracoes() {
      try {
        const dadosRecuperados = JSON.parse(localStorage.getItem("dbConfig"));

        if (dadosRecuperados.home.icone) {
          dadosRecuperados.home.icone = mdiHomeAccount;
        }
        if (dadosRecuperados.contato.icone) {
          dadosRecuperados.contato.icone = mdiCardAccountMail;
        }
        if (dadosRecuperados.sobre.icone) {
          dadosRecuperados.sobre.icone = mdiInformation;
        }
        if (dadosRecuperados.login.icone) {
          dadosRecuperados.login.icone = mdiAccount;
        }
        if (dadosRecuperados.whatsapp.icone) {
          dadosRecuperados.whatsapp.icone = mdiWhatsapp;
        }

        localStorage.setItem("dbConfig", JSON.stringify(dadosRecuperados));

        this.dados = dadosRecuperados;
      } catch (e) {
        console.error("Erro ao carregar configurações:", e);
      }
    },
  },

  mounted() {
    this.carregarConfiguracoes();
  },
};
</script>
