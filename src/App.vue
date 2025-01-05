<template>
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import { request, gql } from "graphql-request";
import jwt_decode from "jwt-decode"; // Certifique-se de que essa importação está correta e instalada via npm.
const DB_CONFIG = gql`
  query {
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
  }
`;
const PD_CONFIG = gql`
  query {
    reset {
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
  }
`;

export default {
  methods: {
    async dbConfig() {
      try {
        const variables = {
          home: {
            borderVisible: this.homeBorderVisible,
            border: this.homeBorder,
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
          padrao: this.padrao,
          email: this.email,
          user: this.user,
          senha: this.senha,
        };

        const reset = localStorage.getItem("reset");
        console.log("reset:", reset);

        if (reset) {
          console.log("Carregando configurações padrão (PD_CONFIG).");
          const responsePD = await request(
            "http://localhost:4000/",
            PD_CONFIG,
            variables
          );
          const dadosPD = responsePD.reset;
          console.log("dadosPD", responsePD.reset);

          localStorage.setItem("dbConfig", JSON.stringify(dadosPD));
          console.log("Configurações padrão salvas com sucesso.");
        } else {
          console.log("Carregando configurações personalizadas (DB_CONFIG).");
          const response = await request("http://localhost:4000/", DB_CONFIG, variables);
          const dados = response.dados;
          console.log(response.dados);

          localStorage.setItem("dbConfig", JSON.stringify(dados));
          console.log("Configurações personalizadas salvas com sucesso.");
        }
      } catch (error) {
        console.error("Erro ao carregar as configurações do servidor:", error);
      }
    },

    validateToken() {
      try {
        const tokenString1 = localStorage.getItem("token");

        if (!tokenString1) {
          console.warn("Token não encontrado.");
          return false;
        }
        const tokenString = JSON.parse(tokenString1);
        console.log(tokenString.token);

        // Decodifica o token JWT
        const token = jwt_decode(tokenString.token);
        const { exp } = token;
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > exp) {
          console.warn("Token expirado. Acesso negado.");
          localStorage.removeItem("token");
          return false;
        }

        console.log("Token válido.");
        return true;
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        localStorage.removeItem("token");
        return false;
      }
    },

    toggleMenuVisibility() {
      try {
        const dadosRecuperados = JSON.parse(localStorage.getItem("dbConfig"));
        if (!dadosRecuperados) {
          console.warn("Dados de configuração não encontrados.");
          return;
        }

        const isTokenValid = this.validateToken();
        dadosRecuperados.menu.menuVisible = isTokenValid;

        localStorage.setItem("dbConfig", JSON.stringify(dadosRecuperados));
        console.log("Menu atualizado com base no token.");
      } catch (error) {
        console.error("Erro ao atualizar a visibilidade do menu:", error);
      }
    },
  },

  mounted() {
    this.dbConfig();
    this.toggleMenuVisibility();
  },
};
</script>
