<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="Login">
      <v-card-text>
        <v-row dense>
          <v-col cols="8">
            <v-text-field label="Email*" required v-model="email"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              label="Password*"
              type="password"
              required
              v-model="senha"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="plain" to="/"> Sair </v-btn>

        <v-btn color="primary" variant="tonal" @click="entrar" :loading="loading">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { request, gql } from "graphql-request";

const DB_CONFIG = gql`
  query($email: String) {
    dados {
      home {
        borderVisible
        border
        bg
        texto
        textVisible
        colorText
        colorIco
        icone
        iconeVisible
      }
      contato {
        borderVisible
        border
        bg
        texto
        textVisible
        colorText
        colorIco
        icone
        iconeVisible
      }
      sobre {
        borderVisible
        border
        bg
        texto
        textVisible
        colorText
        colorIco
        icone
        iconeVisible
      }
      login {
        borderVisible
        border
        bg
        texto
        textVisible
        colorText
        colorIco
        icone
        iconeVisible
        dev
        emailDev
        devS
        devHash
        admin
        emailAdmin
        adminS
        adminHash
        use
        emailUse
        useS
        useHash
      }
      whatsapp {
        icone
        numero
        visible
        colorIcone
      }
      obs {
        colorObs
        visible
        observacao
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
      header {
        transparente
        color
        imageHeader
      }
      padrao
    }
    perfil(email: $email) {
      user
      email
    }
  }
`;

const CONSULTAR_USER_EMAIL = gql`
  query perfil($email: String) {
    perfil(email: $email) {
      user
      email
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation logar($user: String!, $email: String!, $senha: String!) {
    logar(user: $user, email: $email, senha: $senha) {
      user
      email
      token
    }
  }
`;

export default {
  data() {
    return {
      dialog: true,
      senha: "",
      email: "",
      loading: false, // Estado de carregamento
    };
  },

  methods: {
    async deConfig() {
      try {
        const variables = {
          home: {
            borderVisible: this.homeBorderVisible, // Exemplo de como acessar a variável
            border: this.homeBorder, // Exemplo de como acessar a variável
            bg: this.homeBg,
            texto: this.homeTexto,
            textVisible: this.homeTextVisible,
            colorText: this.homeColorText,
            colorIco: this.homeColorIco,
            icone: this.homeIcone,
            iconeVisible: this.homeIconeVisible,
          },
          contato: {
            borderVisible: this.contatoBorderVisible,
            border: this.contatoBorder,
            bg: this.contatoBg,
            texto: this.contatoTexto,
            textVisible: this.contatoTextVisible,
            colorText: this.contatoColorText,
            colorIco: this.contatoColorIco,
            icone: this.contatoIcone,
            iconeVisible: this.contatoIconeVisible,
          },
          sobre: {
            borderVisible: this.sobreBorderVisible,
            border: this.sobreBorder,
            bg: this.sobreBg,
            texto: this.sobreTexto,
            textVisible: this.sobreTextVisible,
            colorText: this.sobreColorText,
            colorIco: this.sobreColorIco,
            icone: this.sobreIcone,
            iconeVisible: this.sobreIconeVisible,
          },
          login: {
            borderVisible: this.loginBorderVisible,
            border: this.loginBorder,
            bg: this.loginBg,
            texto: this.loginTexto,
            textVisible: this.loginTextVisible,
            colorText: this.loginColorText,
            colorIco: this.loginColorIco,
            icone: this.loginIcone,
            iconeVisible: this.loginIconeVisible,
            dev: this.loginDev,
            emailDev: this.loginEmailDev,
            devS: this.loginDevS,
            devHash: this.loginDevHash,
            admin: this.loginAdmin,
            emailAdmin: this.loginEmailAdmin,
            adminS: this.loginAdminS,
            adminHash: this.loginAdminHash,
            use: this.loginUse,
            emailUse: this.loginEmailUse,
            useS: this.loginUseS,
            useHash: this.loginUseHash,
          },
          whatsapp: {
            icone: this.whatsappIcone,
            numero: this.whatsappNumero,
            visible: this.whatsappVisible,
            colorIcone: this.whatsappColorIcone,
          },
          obs: {
            colorObs: this.obsColorObs,
            visible: this.obsVisible,
            observacao: this.obsObservacao,
          },
          menu: {
            colorIcone: this.menuColorIcone,
            menuVisible: this.menuMenuVisible,
          },
          logo: {
            logoVisible: this.logoLogoVisible,
            logotipo: this.logoLogotipo,
            altLogo: this.logoAltLogo,
            lagLogo: this.logoLagLogo,
          },
          header: {
            transparente: this.headerTransparente,
            color: this.headerColor,
            imageHeader: this.headerImageHeader,
          },
          padrao: this.padrao, // Caso seja um valor booleano ou qualquer outro valor
          email: this.email, // Passando o valor de email
          user: this.user, // Passando o valor de user
          senha: this.senha, // Passando o valor de senha
        };

        // console.log(variables);
        const response = await request(
          "http://localhost:4000/", // URL da API GraphQL
          DB_CONFIG,
          variables
        );

        // console.log("response", response);
        return response;
      } catch (error) {
        console.error("Erro na consulta:", error);
      }
    },

    async consultarUserEmail() {
      if (!this.email || !this.senha) {
        alert("É Obrigatório o Email e Senha ");
        localStorage.removeItem("token");
      }

      try {
        const variables = {
          // user: "User", // Alterar conforme necessário
          email: this.email,
          // senha: this.senha, // Adicione a senha aqui
        };

        const response = await request(
          "http://localhost:4000/", // URL da API GraphQL
          CONSULTAR_USER_EMAIL,
          variables
        );

        return response.perfil.user;
      } catch (err) {
        throw new Error(err);
      }
    },

    async entrar() {
      const user = await this.consultarUserEmail();

      if (!user) {
        alert("Email e Senha não Confere");
        localStorage.removeItem("token");
      }

      this.loading = true;

      try {
        const variables = {
          user: user, // Alterar conforme necessário
          email: this.email,
          senha: this.senha, // Adicione a senha aqui
        };

        const response = await request(
          "http://localhost:4000/", // URL da API GraphQL
          LOGIN_MUTATION,
          variables
        );

        // alterar visivel menu
        const dbConfigServer = await this.deConfig();
        dbConfigServer.dados.menu.menuVisible = true;
        localStorage.setItem("dbConfig", JSON.stringify(dbConfigServer.dados));

        //=============================

        // SETANDO O TOKEN
        const token = JSON.stringify(response.logar.token);
        localStorage.setItem("token", token);

        // HABILITANDO O BOTÃO MENU
        const dadosRecuperados = JSON.parse(localStorage.getItem("dbConfig"));
        dadosRecuperados.menu.menuVisible = true;
        localStorage.setItem("dbConfig", JSON.stringify(dadosRecuperados));

        // Redireciona para a página inicial
        window.location.href = "/"; // Redireciona para a home ou outra página

        //console.log(token);
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        localStorage.removeItem("token");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
