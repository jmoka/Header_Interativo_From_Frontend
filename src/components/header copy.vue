<template>
  <v-toolbar
    :style="{ backgroundColor: dados?.header?.color || 'defaultColor' }"
    flat
    :image="imagemfundoheader"
    prominent
  >
    <!-- Menu -->
    <bottomSheets
      :menuVisivel="dados?.menu?.menuVisible"
      :colorIconeMenu="dados?.menu?.corMenu"
    />

    <!-- Logo -->
    <v-img
      class="logo"
      v-if="dados?.logo?.logoVisible"
      :src="dados?.logo?.logotipo"
      :max-height="dados?.logo?.altLogo"
      :max-width="dados?.logo?.lagLogo"
    />

    <!-- Texto Central -->

    <!-- Texto Obsercação -->
    <h4
      class="ml-5"
      v-if="dados?.obs?.visible"
      :style="dados?.obs?.colorObs"
      v-text="dados?.obs?.observacao"
    ></h4>
    <v-spacer></v-spacer>

    <!-- Botões de Navegação -->
    <!-- HOME -->
    <v-btn
      :style="dados?.home?.border"
      to="/"
      :color="dados?.home?.colorIco"
      v-if="dados?.home?.textVisible || dados?.home?.iconeVisible"
      class="mx-1"
    >
      <svg-icon v-if="dados?.home?.iconeVisible" type="mdi" :path="dados?.home?.icone" />
      <h4
        v-if="dados?.home?.textVisible"
        :style="dados?.home?.colorText"
        v-text="dados?.home?.texto"
      />
    </v-btn>

    <!-- CONTATO -->
    <v-btn
      :style="dados?.contato?.border"
      to="/contato"
      :color="dados?.contato?.colorIco"
      v-if="dados?.contato?.textVisible || dados?.contato?.iconeVisible"
      class="mx-1"
    >
      <svg-icon
        v-if="dados?.contato?.iconeVisible"
        type="mdi"
        :path="dados?.contato?.icone"
      />
      <h4
        v-if="dados?.contato?.textVisible"
        :style="dados?.contato?.colorText"
        v-text="dados?.contato?.texto"
      />
    </v-btn>
    <!-- SOBRE -->
    <v-btn
      :style="dados?.sobre?.border"
      to="/sobre"
      :color="dados?.sobre?.colorIco"
      v-if="dados?.sobre?.textVisible || dados?.sobre?.iconeVisible"
      class="mx-1"
    >
      <svg-icon
        v-if="dados?.sobre?.iconeVisible"
        type="mdi"
        :path="dados?.sobre?.icone"
      />
      <h4
        v-if="dados?.sobre?.textVisible"
        :style="dados?.sobre?.colorText"
        v-text="dados?.sobre?.texto"
      />
    </v-btn>
    <!-- LOGIN -->
    <v-btn
      :style="dados?.login?.border"
      to="/login"
      :color="dados?.login?.colorIco"
      v-if="dados?.login?.textVisible || dados?.login?.iconeVisible"
      class="mx-1"
    >
      <svg-icon
        v-if="dados?.login?.iconeVisible"
        type="mdi"
        :path="dados?.login?.icone"
      />
      <h4
        v-if="dados?.login?.textVisible"
        :style="dados?.login?.colorText"
        v-text="dados?.login?.texto"
      />
    </v-btn>

    <!-- WhatsApp -->
    <v-btn
      v-if="dados?.whatsapp?.Visible"
      icon
      :color="dados?.colorIcone"
      :href="linkWhatsapp"
      target="_blank"
      class="mx-1"
    >
      <svg-icon type="mdi" :path="dados?.whatsapp?.icone" />
    </v-btn>
  </v-toolbar>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import bottomSheets from "../../src/components/bottomSheets.vue";
import { request, gql } from "graphql-request";

const DB_CONFIG = gql`
  query($email: String) {
    dados {
      header {
        color
        imageHeader
      }
      menu {
        colorIcone
        menuVisible
      }
      logo {
        logoVisible
        logotipo
        altLogo
        lagLogo
      }
      obs {
        colorObs
        visible
        observacao
      }
      home {
        border
        colorIco
        texto
        textVisible
        icone
        iconeVisible
      }
      contato {
        border
        colorIco
        texto
        textVisible
        icone
        iconeVisible
      }
      sobre {
        border
        colorIco
        texto
        textVisible
        icone
        iconeVisible
      }
      login {
        border
        colorIco
        texto
        textVisible
        icone
        iconeVisible
      }
      whatsapp {
        icone
        numero
        visible
        colorIcone
      }
    }
  }
`;

export default {
  components: {
    SvgIcon,
    bottomSheets,
  },
  data() {
    return {
      dados: {}, // Ensure the data is initialized as null
    };
  },
  computed: {
    linkWhatsapp() {
      return this.dados?.whatsapp?.numero
        ? `https://wa.me/${this.dados.whatsapp.numero}?text=suporte`
        : "";
    },
    imagemfundoheader() {
      return this.dados?.header?.imageHeader
        ? "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        : null;
    },
  },
  methods: {
    async carregarConfiguracoes() {
      try {
        const dbConfigServer = await this.deConfig();
        this.dados = dbConfigServer.dados || {}; // Safely set the dados object
        localStorage.setItem("dbConfig", JSON.stringify(this.dados));
      } catch (e) {
        console.error("Erro ao carregar configurações:", e);
      }
    },
    async deConfig() {
      try {
        const response = await request("http://localhost:4000/", DB_CONFIG, {
          email: this.email,
        });
        return response;
      } catch (error) {
        console.error("Erro na consulta:", error);
      }
    },
  },
  mounted() {
    this.carregarConfiguracoes();
  },
};
</script>
