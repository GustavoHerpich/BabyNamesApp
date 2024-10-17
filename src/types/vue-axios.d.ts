declare module 'vue-axios' {
  import { Plugin } from 'vue';
  import axios, { AxiosInstance } from 'axios';
  
  const VueAxios: Plugin;
  export { VueAxios, axios };
}
