<template>
  <v-toolbar :class="dados.header.color" flat :image="imagemfundoheader" prominent>
    <!-- Menu -->
    <bottomSheets :colorIcone="dados.menu.colorIcone" />

    <!-- Logo -->
    <v-img
      class="logo"
      v-if="dados.logo.logoVisible"
      :src="dados.logo.logotipo"
      :max-height="dados.logo.altLogo"
      :max-width="dados.logo.lagLogo"
    />

    <!-- Texto Central -->

    <!-- Texto Obsercação -->
    <h4
      class="ml-5"
      v-if="dados.obs.visible"
      :class="colorObs"
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
          borderVisible: false,
          border: null,
          bg: "tranparent",
          texto: "Home",
          textVisible: true,
          colorText: "color:#ffff",
          colorIco: "blue",
          icone: mdiHomeAccount,
          iconeVisible: true,
        },
        contato: {
          borderVisible: false,
          border: null,
          bg: "tranparent",
          texto: "Constato",
          textVisible: true,
          colorText: "color:#ffff",
          colorIco: "blue",
          icone: mdiCardAccountMail,
          iconeVisible: true,
        },
        sobre: {
          borderVisible: false,
          border: null,
          bg: "tranparent",
          texto: "Sobre Nós",
          textVisible: true,
          colorText: "color:#ffff",
          colorIco: "blue",
          icone: mdiInformation,
          iconeVisible: true,
        },
        login: {
          borderVisible: false,
          border: null,
          bg: "tranparent",
          texto: "Login",
          textVisible: true,
          colorText: "color:#ffff",
          colorIco: "blue",
          icone: mdiAccount,
          iconeVisible: true,
        },
        whatsapp: {
          icone: mdiWhatsapp,
          numero: "",
          Visible: true,
          colorIcone: "green",
        },
        obs: {
          visible: true,
          observacao: "empresa@gmail.com / (91)9 9629-3532",
        },
        menu: {
          colorIcone: "blue",
        },
        logo: {
          logoVisible: true,
          logotipo: "logo.webp",
          altLogo: "70",
          lagLogo: "300",
        },
        header: {
          color: "bg-black",
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
    console.log(
      "Logo Visible:",
      this.dados.logo.logoVisible,
      "Logo Path:",
      this.dados.logo
    );
    this.carregarConfiguracoes(); // Carregar configurações ao montar o componente
  },
};
</script>
