<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="text-center" elevation="12" style="background-color: #f8f9fa;">
          <v-img
            src="@/assets/logo-baby.png"
            alt="Logo Nomes de Bebês"
            class="mb-4"
            max-width="200"
            contain
          ></v-img>
          <v-card-title class="headline text-primary">
            Bem-vindo ao Nomes de Bebês!
          </v-card-title>
          <v-card-text>
            <p class="subtitle-1 text-grey">
              Escolher um nome especial para o seu bebê é uma jornada emocionante. 
              Explore nossa lista de nomes encantadores e únicos para dar um toque mágico ao nome do seu bebê.
            </p>
          </v-card-text>
          <v-btn @click="goToLogin" color="pink lighten-3" large rounded elevation="10" class="mx-3 mt-4">
            Comece Agora
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-text class="text-center">
            <p class="subtitle-1 text-secondary">
              <strong>Precisa de inspiração?</strong> Navegue por nossa coleção de nomes para encontrar o nome perfeito para o seu pequeno ou pequena!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goToLogin = () => {
      router.push({ name: 'login' });
    };

    return { goToLogin };
  },
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fce4ec, #fff);
}

.headline {
  font-family: 'Playfair Display', serif;
  font-size: 2.5em;
  margin-bottom: 0;
}

.subtitle-1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
}

v-btn {
  transition: transform 0.2s ease-in-out;
}

v-btn:hover {
  transform: scale(1.05);
}
</style>