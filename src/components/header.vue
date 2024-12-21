<template>
  <v-toolbar :class="dados.colorBarra" flat :image="imagemfundoBarra" prominent>
    <!-- Menu -->
    <bottomSheets :colorIconeMenu="dados.colorIconeMenu" />

    <!-- Logo -->
    <v-img
      class="logo"
      v-if="dados.logoVisible"
      :src="dados.logo"
      :max-height="dados.altLogo"
      :max-width="dados.lagLogo"
    />

    <!-- Texto Central -->

    <!-- Texto Obsercação -->
    <h4 class="ml-5" v-if="dados.visibleObs" :class="colorObs" v-text="dados.obs"></h4>
    <v-spacer></v-spacer>

    <!-- Botões de Navegação -->
    <v-btn
      :style="dados.home.border"
      to="/"
      :color="dados.home.colorIcoHome"
      v-if="dados.home.textVisibleHome || dados.home.iconeHomeVisible"
    >
      <svg-icon
        v-if="dados.home.iconeHomeVisible"
        type="mdi"
        :path="dados.home.icohome"
      />
      <h4
        v-if="dados.home.textVisibleHome"
        :style="dados.home.colorTextHome"
        v-text="dados.home.textoHome"
      />
    </v-btn>

    <v-btn to="/contatos" :color="dados.colorIconeContato">
      <svg-icon type="mdi" :path="dados.icoContato" />
      <h4
        :style="dados.colorTextContato"
        v-if="dados.textVisibleContato"
        v-text="dados.textoContato"
      />
    </v-btn>

    <v-btn :color="dados.colorIconeInforme" to="/sobre">
      <svg-icon type="mdi" :path="dados.icoSobre" />
      <h4
        :style="dados.colorTextSobreNos"
        v-if="dados.sobrenostoVisible"
        v-text="dados.textoSobreNos"
      />
    </v-btn>
    <v-btn :color="dados.colorIconeLogin" to="/login" @click="formLogin">
      <svg-icon type="mdi" :path="dados.icoLogin" />
      <h4
        :style="dados.colorTextLogin"
        v-if="dados.textLoginVisible"
        v-text="dados.textLogin"
      />
    </v-btn>

    <!-- WhatsApp -->
    <v-btn
      v-if="dados.wnatsappVisible"
      icon
      :color="dados.colorIconeWhatsapp"
      :href="linkWhatsapp"
      target="_blank"
    >
      <svg-icon type="mdi" :path="icoWhatsapp" />
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
  mdiMenu,
  mdiFormatLineStyle,
} from "@mdi/js";

import bottomSheets from "../../src/components/bottomSheets.vue";

export default {
  components: {
    SvgIcon,

    bottomSheets,
  },
  data() {
    return {
      dados: {
        home: {
          border: null,
          bg: "tranparent",
          textoHome: "Home",
          textVisibleHome: true,
          colorTextHome: "color:#ffff",
          colorIcoHome: "blue",
          icohome: mdiHomeAccount,
          iconeHomeVisible: true,
        },

        padrao: true,
        titulo: "Header Reativo",

        // Botao Home

        // textoHome: "Home",
        // textVisibleHome: true,
        // colorTextHome: "color:#ffff",
        // colorIcoHome: "blue",
        // icohome: mdiHomeAccount,
        // iconeHomeVisible: true,

        // Botao Contatos
        textoContato: "Contatos",
        textVisibleContato: true,
        colorTextContato: "color:#ffff",
        colorIconeContato: "blue",
        icoContato: mdiCardAccountMail,

        // BOtão Sobre Nós
        textoSobreNos: "Sobre Nós",
        sobrenostoVisible: true,
        colorTextSobreNos: "color:#ffff",
        colorIconeInforme: "blue",
        icoSobre: mdiInformation,

        // Observação
        visibleObs: true,

        // Login
        textLogin: "Login",
        textLoginVisible: true,
        colorIconeLogin: "blue",
        colorTextLogin: "color:#ffff",
        icoLogin: mdiAccount,

        icoWhatsapp: mdiWhatsapp,

        obs: "empresa@gmail.com / (91)9 9629-3532",

        colorTextContato: "color:#ffff",

        colorIconeMenu: "blue",
        colorIconeWhatsapp: "green",

        colorBarra: "bg-black",
        logoVisible: true,
        logo: "https://via.placeholder.com/300x70",
        altLogo: "70",
        lagLogo: "300",
        imageHeader: false,
        // whatsapp
        numeroWhatsApp: "",
        wnatsappVisible: true,
      },
    };
  },

  computed: {
    linkWhatsapp() {
      return `https://wa.me/${this.dados.numeroWhatsApp}?text=suporte`;
    },
    imagemfundoBarra() {
      return this.dados.imageHeader
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
        localStorage.setItem("dbConfig", JSON.stringify(this.dados));
      } catch (e) {
        console.error("Erro ao salvar configurações:", e);
      }
    },

    carregarConfiguracoes() {
      try {
        const dadossalvos = localStorage.getItem("dbConfig");
        let p = JSON.parse(dadossalvos);

        if (dadossalvos && p.padrao) {
          this.dados = p; // Atualize a propriedade `dados` diretamente
          this.textLogin = this.dados.textLogin; // Carregue o valor de `textLogin`
        } else {
          this.salvarConfiguracoes();
        }
      } catch (e) {
        console.error("Erro ao carregar configurações:", e);
      }
    },
    // reset() {
    //   localStorage.removeItem("dbConfig");
    //   location.reload();
    // },
  },

  mounted() {
    // this.salvarConfiguracoes();
    console.log("Logo Visible:", this.dados.logoVisible, "Logo Path:", this.dados.logo);
    this.carregarConfiguracoes(); // Carregar configurações ao montar o componente
  },
};
</script>
