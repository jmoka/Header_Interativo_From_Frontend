<template>
  <v-toolbar :class="dados.colorBarra" flat :image="imagemfundoBarra" prominent>
    <!-- Menu -->
    <bottomSheets :colorIconeMenu="dados.colorIconeMenu" />

    <!-- Logo -->
    <v-img
      @dblclick="reset"
      :src="dados.logo"
      :max-height="dados.altLogo"
      :max-width="dados.lagLogo"
    />

    <!-- Texto Central -->

    <h4 class="ml-5" :v-if="visibleObs" :class="colorObs" v-text="dados.obs"></h4>
    <v-spacer></v-spacer>

    <!-- Botões de Navegação -->
    <v-btn to="/">
      <svg-icon :color="dados.colorIcoHome" type="mdi" :path="mdiHomeAccount" />
      <h4
        v-if="dados.textVisibleHome"
        :class="dados.colorAba1"
        v-text="dados.textoAba1"
      />
    </v-btn>

    <v-btn to="/contatos" :color="dados.colorIconeContato">
      <svg-icon type="mdi" :path="mdiCardAccountMail" />
      <h4 :class="dados.colorAba2" v-text="dados.textoAba2" />
    </v-btn>

    <v-btn :color="dados.colorIconeInforme" to="/sobre">
      <svg-icon type="mdi" :path="mdiInformation" />
      <h4 :class="dados.colorAba3" v-text="dados.textoAba3" />
    </v-btn>

    <!-- Botão de Login -->
    <dialogFormLogin
      :colorIconeLogin="dados.colorIconeLogin"
      :colorTextLogin="dados.colorTextLogin"
      :TextLogin="textLogin"
    />

    <!-- WhatsApp -->
    <v-btn
      v-once
      icon
      :color="dados.colorIconeWhatsapp"
      :href="linkWhatsapp"
      target="_blank"
    >
      <svg-icon type="mdi" :path="mdiWhatsapp" />
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
        // Botao Contatos
        textoAba2: "Contatos",
        textoAba3: "Sobre Nós",
        visibleObs: true,
        obs: "empresa@gmail.com / (91)9 9629-3532",
        colorAba1: "text-white",
        colorAba2: "text-white",
        colorAba3: "text-white",
        colorIcoHome: "blue",
        colorIconeMenu: "blue",
        colorIconeWhatsapp: "green",
        colorIconeLogin: "blue",
        colorTextLogin: "#AB47BC",
        textLogin: "Login",
        colorIconeContato: "blue",
        colorIconeInforme: "blue",
        colorBarra: "bg-black",
        logo: "logo.webp",
        altLogo: "70",
        lagLogo: "300",
        imageHeader: false,
        numeroWhatsApp: "559999999999",
      },

      mdiAccount,
      mdiHomeAccount,
      mdiCardAccountMail,
      mdiInformation,
      mdiWhatsapp,
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
        console.log("Configurações salvas:", JSON.stringify(this.dados));
      } catch (e) {
        console.error("Erro ao salvar configurações:", e);
      }
    },

    carregarConfiguracoes() {
      try {
        const dadossalvos = localStorage.getItem("dbConfig");
        let p = JSON.parse(dadossalvos);
        console.log(p);

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
    reset() {
      localStorage.removeItem("dbConfig");
      location.reload();
    },
  },

  mounted() {
    // this.salvarConfiguracoes();
    this.carregarConfiguracoes(); // Carregar configurações ao montar o componente
  },
};
</script>
