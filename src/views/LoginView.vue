<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="validForm">
              <v-text-field
                v-model="login"
                label="Nome"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required]"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              ></v-text-field>
              <v-btn @click="authenticate(login, password)" :disabled="!validForm" color="primary">Entrar</v-btn>
              <v-alert v-if="showLoginError" type="error" dismissible>
                {{ extractAxiosErrorMessage(loginReq.errorObj) }}
              </v-alert>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-btn @click="goToRegister">Cadastrar</v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="goToRecoverPassword">Esqueci minha senha</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsers } from "@/stores/modules/user";
import { _babyNames } from "@/plugins/axios";
import Token from "@/models/user/Token";
import Requester from "@/utils/requests/Requester";
import { extractAxiosErrorMessage } from "@/utils/requests/Request";

export default {
  setup() {
    const router = useRouter();
    const userStore = useUsers();

    const validForm = ref(false);
    const login = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const showLoginError = ref(false);
    
    const loginReq = reactive(new Requester<Token>(_babyNames));

    const rules = {
      required: (value: string) => !!value || "Campo obrigatório",
    };

    async function authenticate(login: string, password: string): Promise<void> {
      showLoginError.value = false;

      await loginReq.request({
        method: "post",
        url: "auth/login",
        data: { username: login, password: password },
        onSuccess: () => {
          if (loginReq.response) {
            userStore.saveUser(loginReq.response); 
            router.push({ name: "names" });
          }
        },
        onError: () => {
          showLoginError.value = true;
          clearLoginFields();
        }
      });
    }

    function clearLoginFields() {
      login.value = "";
      password.value = "";
    }

    function goToRegister() {
      router.push({ name: "register" });
    }

    function goToRecoverPassword() {
      router.push({ name: "recoverPassword" });
    }

    return {
      validForm,
      login,
      password,
      showPassword,
      showLoginError,
      rules,
      authenticate,
      goToRegister,
      goToRecoverPassword,
      extractAxiosErrorMessage,
      loginReq
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>