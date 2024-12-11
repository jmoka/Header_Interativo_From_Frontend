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
          <v-btn v-if="!visiveBtnlSalvar" icon @click="dialog = false">
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

        <v-container style="width: 50%">
          <v-sheet>
            <v-form @submit.prevent="alterar">
              <v-row class="mb-6 justify-center align-center">
                <!-- Ícone de Confirmação -->
                <v-col
                  v-if="iconeAba1Visivel"
                  cols="1"
                  class="d-flex justify-center align-center"
                >
                  <svg-icon
                    :color="colorIcone"
                    type="mdi"
                    :path="mdiHandOkay"
                    size="50"
                  />
                </v-col>

                <!-- Texto Home -->
                <v-col cols="5" class="d-flex flex-column align-left">
                  <v-label text="Trocar texto Home"></v-label>
                  <v-text-field class="w-100" v-model="textHome" label="Título Home">
                  </v-text-field>
                  <span class="mt-2" :style="{ backgroundColor: corHome }">.</span>
                </v-col>

                <!-- Switch Visibilidade -->

                <v-col>
                  <p v-if="!TextovisivelOcultoHome">Oculto</p>
                  <v-switch
                    v-model="keyHome"
                    @change="acaobtnVisivel"
                    color="green"
                    base-color="red"
                  >
                  </v-switch>

                  <p v-if="TextovisivelOcultoHome">Visivel</p>
                </v-col>

                <!-- Cor do Texto -->
                <v-col cols="3" class="d-flex flex-column align-center">
                  <p :style="{ color: corHome }">Cor texto Home</p>
                  <v-color-picker
                    v-model="corHome"
                    mode="hexa"
                    show-swatches
                    hide-inputs
                    hide-sliders
                    hide-canvas
                  ></v-color-picker>
                </v-col>
              </v-row>
              <v-row class="mb-6 justify-center align-center">
                <!-- Texto Contato -->

                <v-col
                  v-if="iconeAba2Visivel"
                  cols="1"
                  class="d-flex justify-center align-center"
                >
                  <svg-icon
                    :color="colorIcone"
                    type="mdi"
                    :path="mdiHandOkay"
                    size="50"
                  />
                </v-col>
                <!-- texto contatos -->
                <v-col cols="5" class="d-flex flex-column align-left">
                  <v-label text="Trocar texto Contatos"></v-label>
                  <v-text-field
                    class="w-100"
                    v-model="textContato"
                    label="Título do Contato"
                  ></v-text-field>
                  <span class="mt-2" :style="{ backgroundColor: corContato }">.</span>
                </v-col>

                <!-- Switch Visibilidade -->

                <v-col>
                  <p v-if="!TextovisivelOcultoContatos">Oculto</p>
                  <v-switch
                    v-model="contato"
                    @change="acaobtnVisivel"
                    color="green"
                    base-color="red"
                  >
                  </v-switch>

                  <p v-if="TextovisivelOcultoContatos">Visivel</p>
                </v-col>
                <v-col cols="3" class="d-flex flex-column align-center">
                  <p :style="{ color: corContato }">Cor texto Contato</p>
                  <v-color-picker
                    v-model="corContato"
                    mode="hexa"
                    show-swatches
                    hide-inputs
                    hide-sliders
                    hide-canvas
                  ></v-color-picker>
                </v-col>
              </v-row>
              <v-row>
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
              </v-row>
              <v-form>
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
                </span> </v-form
              >v-row>

              <!-- observação -->
              <v-form>
                <span class="d-flex">
                  <v-text-field
                    v-model="textOBS"
                    label="Título Observação"
                  ></v-text-field>
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
                </span> </v-form
              >v-row>

              <!-- whatsApp -->
              <v-row>
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
              </v-row>

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
      TextovisivelOcultoHome: true,
      TextovisivelOcultoContatos: true,
      colorIcoVoltar: "",
      keyHome: true,
      corContato: "color-black",
      corHome: "color-black",
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
        this.TextovisivelOcultoHome = this.keyHome;
        this.TextovisivelOcultoContatos = this.keyHome;
      } else {
        localStorage.setItem("opcao", JSON.stringify(this.keyHome));
        this.TextovisivelOcultoHome = this.keyHome;
        this.TextovisivelOcultoContatos = this.keyHome;
      }

      if (this.whatsapp) {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      } else {
        localStorage.setItem("opcao1", JSON.stringify(this.whatsapp));
      }

      if (this.contato) {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
        this.TextovisivelOcultoContatos = this.contato;
      } else {
        localStorage.setItem("opcao2", JSON.stringify(this.contato));
        this.TextovisivelOcultoContatos = this.contato;
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

      if (this.corHome) {
        localStorage.setItem("corHome", JSON.stringify("color:" + this.corHome));
      } else {
        localStorage.setItem("corHome", JSON.stringify("color:" + this.corHome));
      }
      if (this.corContato) {
        localStorage.setItem("corContato", JSON.stringify("color:" + this.corContato));
      } else {
        localStorage.setItem("corContato", JSON.stringify("color:" + this.corContato));
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
          this.iconeAba1Visivel = true;
        }
        if (this.textObsVisible) {
          dbAtualizado.visibleObs = this.textObsVisible;
          this.iconeAba1Visivel = true;
        }
        if (this.corHome) {
          dbAtualizado.colorTextHome = "color:" + this.corHome;
          this.iconeAba1Visivel = true;
        }
        if (this.corContato) {
          dbAtualizado.colorTextContato = "color:" + this.corContato;
          this.iconeAba2Visivel = true;
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

    const opcaoCorHome = localStorage.getItem("corHome");
    this.corHome = opcaoCorHome ? JSON.parse(opcaoCorHome) : "";

    const opcaoCorContato = localStorage.getItem("corContato");
    this.corContato = opcaoCorContato ? JSON.parse(opcaoCorContato) : "";
  },
};
</script>
