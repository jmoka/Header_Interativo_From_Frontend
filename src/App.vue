<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import jwt_decode from "jwt-decode";

onMounted(() => {
  try {
    const tokenString = localStorage.getItem("token"); // Pega o token no localStorage

    if (!tokenString) {
      console.log("Token não encontrado");
      return;
    }

    // Verifica se é JSON ou uma string simples
    let tokenValue;
    try {
      const parsed = JSON.parse(tokenString);
      tokenValue = parsed.token || tokenString; // Caso seja um objeto ou string simples
    } catch {
      tokenValue = tokenString; // Assume que é uma string simples
    }

    const token = jwt_decode(tokenValue); // Decodifica o token JWT
    console.log(token, "tokennn");

    const { exp } = token; // Pega a propriedade exp
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    console.log(currentTime, "-", exp);
    if (currentTime > exp) {
      console.warn("Acesso negado: token expirado");
      localStorage.removeItem("token");
    } else {
      console.log("Token válido");
    }
  } catch (error) {
    console.error("Erro ao processar o token:", error);
    localStorage.removeItem("token");
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
