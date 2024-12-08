<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn max-width="80" size="small" v-bind="activatorProps">
          <span class="mx-3">{{ title }}</span>
          <span>
            <svg-icon type="mdi" :path="icones"></svg-icon>
          </span>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-btn
            v-if="!visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
          >
            <svg-icon :color="red" type="mdi" :path="mdiArrowLeftCircle" />
          </v-btn>

          <v-toolbar-title>Configurar Textos e Títulos</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            v-if="visiveBtnlSalvar"
            :color="colorSalvar"
            :class="bg"
            text
            @click="salvar"
            >Salvar</v-btn
          >
        </v-toolbar>

        <v-container>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="alterar">
              <span class="d-flex">
                <v-text-field v-model="textHome" label="Título Home"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeAba1Visivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="keyHome"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <span class="d-flex">
                <v-text-field
                  v-model="textContato"
                  label="Título do Contato"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeAba2Visivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="contato"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <span class="d-flex">
                <v-text-field
                  v-model="textSobreNos"
                  label="Título Sobre Nós"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeAba3Visivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="sobrenos"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <!-- login -->
              <span class="d-flex">
                <v-text-field v-model="textDoLogin" label="Título Login"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="iconeLoginVisivel"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="textVisibleLogin"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <!-- observação -->
              <span class="d-flex">
                <v-text-field v-model="textOBS" label="Título Observação"></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="visibleObs"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="textObsVisible"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <!-- whatsApp -->
              <span class="d-flex">
                <v-text-field
                  v-model="TextWhatsapp"
                  label="Numero WhatsApp"
                ></v-text-field>
                <svg-icon
                  :color="colorIcone"
                  v-if="visibleWhatsapp"
                  type="mdi"
                  :path="mdiHandOkay"
                  size="50"
                />
                <v-switch
                  v-model="whatsapp"
                  @change="acaobtnVisivel"
                  color="green"
                  base-color="red"
                >
                </v-switch>
              </span>

              <v-btn class="mt-2" type="submit" block>Alterar</v-btn>
            </v-form>
          </v-sheet>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHandOkay, mdiArrowLeftCircle } from "@mdi/js";

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
      colorIcoVoltar: "",
      keyHome: true,
      whatsapp: true,
      contato: true,
      sobrenos: true,
      textVisibleLogin: true,
      visiveBtnlSalvar: false,
      visibleWhatsapp: false,
      textObsVisible: false,
      visibleObs: false,
      colorSalvar: "white",
      bg: "bg-blue",
      iconeAba1Visivel: false,
      iconeAba2Visivel: false,
      iconeAba3Visivel: false,
      iconeLoginVisivel: false,
      dialog: false,
      textHome: "",
      textContato: "",
      textSobreNos: "",
      textDoLogin: "",
      TextWhatsapp: "",
      textOBS: "",
      mdiHandOkay,
      mdiArrowLeftCircle,
      colorIcone: "green",
    };
  },
  methods: {
    acaobtnVisivel() {
      if (this.keyHome) {
        localStorage.setItem("opcao", JSON.stringify(this.keyHome));
      } else {
        localStorage.setItem("opcao", JSON.stringify(this.keyHome));
      }

      if (this.whatsapp) {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      } else {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      }

      if (this.contato) {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
      } else {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
      }

      if (this.sobrenos) {
        localStorage.setItem("opcao3", JSON.stringify(this.sobrenos));
      } else {
        localStorage.setItem("opcao3", JSON.stringify(this.sobrenos));
      }

      if (this.textVisibleLogin) {
        localStorage.setItem("opcao4", JSON.stringify(this.textVisibleLogin));
      } else {
        localStorage.setItem("opcao4", JSON.stringify(this.textVisibleLogin));
      }

      if (this.textObsVisible) {
        localStorage.setItem("opcao5", JSON.stringify(this.textObsVisible));
      } else {
        localStorage.setItem("opcao5", JSON.stringify(this.textObsVisible));
      }
    },

    salvar() {
      location.reload();
    },
    alterar() {
      try {
        let db = localStorage.getItem("dbConfig");
        let dbAtualizado = db ? JSON.parse(db) : {};

        if (this.textHome) {
          dbAtualizado.textoAba1 = this.textHome || null;
          this.iconeAba1Visivel = true;
        }

        if (this.textContato) {
          dbAtualizado.textoAba2 = this.textContato || null;
          this.iconeAba2Visivel = true;
        }
        if (this.textSobreNos) {
          dbAtualizado.textoAba3 = this.textSobreNos || null;
          this.iconeAba3Visivel = true;
        }
        if (this.textDoLogin) {
          dbAtualizado.textLogin = this.textDoLogin || null;
          this.iconeLoginVisivel = true;
        }
        if (this.textOBS) {
          dbAtualizado.obs = this.textOBS || null;
          this.visibleObs = true;
        }
        if (this.TextWhatsapp) {
          dbAtualizado.numeroWhatsApp = this.TextWhatsapp || null;
          this.visibleWhatsapp = true;
        }
        if (this.textLoginVisible) {
          dbAtualizado.textLoginVisible = this.textVisibleLogin;
        }
        if (this.textObsVisible) {
          dbAtualizado.visibleObs = this.textObsVisible;
        }

        dbAtualizado.textVisibleHome = this.keyHome;
        dbAtualizado.wnatsappVisible = this.whatsapp;
        dbAtualizado.contatoVisible = this.contato;
        dbAtualizado.sobrenostoVisible = this.sobrenos;
        dbAtualizado.textLoginVisible = this.textVisibleLogin;
        dbAtualizado.visibleObs = this.textObsVisible;

        localStorage.setItem("dbConfig", JSON.stringify(dbAtualizado));
        this.visiveBtnlSalvar = true;

        this.colorSalvar = "white";
        this.bg = "bg-green";
      } catch (error) {
        console.error("Erro ao alterar as configurações:", error);
      }
    },
  },
  mounted() {
    const opcaoArmazenada = localStorage.getItem("opcao");
    this.keyHome = opcaoArmazenada ? JSON.parse(opcaoArmazenada) : true;

    const opcaoWhatsappa = localStorage.getItem("opcao1");
    this.whatsapp = opcaoWhatsappa ? JSON.parse(opcaoWhatsappa) : true;

    const opcaoContato = localStorage.getItem("opcao2");
    this.contato = opcaoContato ? JSON.parse(opcaoContato) : true;

    const opcaoSobreNos = localStorage.getItem("opcao3");
    this.sobrenos = opcaoSobreNos ? JSON.parse(opcaoSobreNos) : true;

    const opcaoTextoLogin = localStorage.getItem("opcao4");
    this.textVisibleLogin = opcaoTextoLogin ? JSON.parse(opcaoTextoLogin) : true;

    const opcaoTextoObs = localStorage.getItem("opcao5");
    this.textObsVisible = opcaoTextoObs ? JSON.parse(opcaoTextoObs) : true;
  },
};
</script>
