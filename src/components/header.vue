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
    <v-btn to="/">
      <svg-icon :color="dados.colorIcoHome" type="mdi" :path="icohome" />
      <h4
        v-if="dados.textVisibleHome"
        :style="dados.colorTextHome"
        v-text="dados.textoAba1"
      />
    </v-btn>

    <v-btn to="/contatos" :color="dados.colorIconeContato">
      <svg-icon type="mdi" :path="icoContato" />
      <h4
        :style="dados.colorTextContato"
        v-if="dados.contatoVisible"
        v-text="dados.textoAba2"
      />
    </v-btn>

    <v-btn :color="dados.colorIconeInforme" to="/sobre">
      <svg-icon type="mdi" :path="icoSobre" />
      <h4
        :style="dados.colorTextSobreNos"
        v-if="dados.sobrenostoVisible"
        :class="dados.colorAba3"
        v-text="dados.textoAba3"
      />
    </v-btn>

    <!-- Botão de Login -->
    <dialogFormLogin
      :colorIconeLogin="dados.colorIconeLogin"
      :colorTextLogin="dados.colorTextLogin"
      :TextLogin="dados.textLogin"
      :icologin="icoLogin"
      :TextLoginVisible="dados.textLoginVisible"
    />

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
import dialogFormLogin from "../../src/components/dialogFormLogin.vue";
import bottomSheets from "../../src/components/bottomSheets.vue";

export default {
  components: {
    SvgIcon,
    dialogFormLogin,
    bottomSheets,
  },
  data() {
    return {
      dados: {
        padrao: true,
        titulo: "Header Reativo",
        // Botao Home
        textoAba1: "Home",
        textVisibleHome: true,
        colorTextHome: "color:#ffff",

        // Botao Contatos
        textoAba2: "Contatos",
        contatoVisible: true,

        // BOtão Sobre Nós
        textoAba3: "Sobre Nós",
        sobrenostoVisible: true,

        // Observação
        visibleObs: true,

        // Login
        textLogin: "Login",
        textLoginVisible: true,

        colorIconeLogin: "blue",
        colorTextLogin: "#AB47BC",

        obs: "empresa@gmail.com / (91)9 9629-3532",

        colorTextContato: "color:#ffff",
        colorTextSobreNos: "color:#ffff",
        colorAba2: "text-white",
        colorAba3: "text-white",
        colorIcoHome: "blue",
        colorIconeMenu: "blue",
        colorIconeWhatsapp: "green",

        colorIconeContato: "blue",
        colorIconeInforme: "blue",
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
      logoVisible: true,
      icohome: mdiHomeAccount,
      icoContato: mdiCardAccountMail,
      icoSobre: mdiInformation,
      icoLogin: mdiAccount,
      icoWhatsapp: mdiWhatsapp,
      mdiMenu,
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
    console.log("Logo Visible:", this.logoVisible, "Logo Path:", this.dados.logo);
    this.carregarConfiguracoes(); // Carregar configurações ao montar o componente
  },
};
</script>
