<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Cadastrar</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="validForm">
              <v-text-field
                v-model="username"
                label="Nome de Usuário"
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
              <v-select
                v-model="role"
                :items="roles"
                label="Função"
                :rules="[rules.required]"
              ></v-select>
              <v-btn @click="registerUser" :disabled="!validForm" color="primary">Cadastrar</v-btn>
              <v-alert v-if="showRecoverSuccess" type="success" dismissible>
                User {{ registerReq.response?.username }} added successfully! 
              </v-alert>

              <v-alert v-if="showRegisterError" type="error" dismissible>
                {{ extractAxiosErrorMessage(registerReq.errorObj) }}
              </v-alert>
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
import { _babyNames } from "@/plugins/axios";
import UserAuthentication from "@/models/user/UserAuthentication";
import Requester from "@/utils/requests/Requester";
import { extractAxiosErrorMessage } from "@/utils/requests/Request";

export default {
  setup() {
    const router = useRouter();
    const validForm = ref(false);
    const username = ref("");
    const password = ref("");
    const role = ref(""); 
    const showPassword = ref(false); 
    const showRegisterError = ref(false);
    const showRecoverSuccess = ref(false);
    
    const roles = ["Admin", "User"];
    const registerReq = reactive(new Requester<UserAuthentication>(_babyNames));

    const rules = {
      required: (value: string) => !!value || "Campo obrigatório",
    };

    async function registerUser() {
      showRegisterError.value = false;

      const roleValue = role.value === "Admin" ? 1 : 0;

      await registerReq.request({
        method: "post",
        url: "auth/register",
        data: { username: username.value, password: password.value, role: roleValue },
        onSuccess: () => {
          if (registerReq.response) {
            showRecoverSuccess.value = true;
            setTimeout(() => {
              router.push({ name: "login" });
            }, 3000);
          }
        },
        onError: () => {
          showRegisterError.value = true;
        }
      });
    }

    return {
      validForm,
      username,
      password,
      role,
      showPassword,
      showRegisterError,
      roles,
      rules,
      registerUser,
      extractAxiosErrorMessage,
      registerReq,
      showRecoverSuccess
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
