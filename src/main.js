// Create a Vue application
import {createApp} from "vue";
// @ = top level of the project directory - imports tailwind styles
import"@/index.css";
// Import the component
import App from "./App.vue";
// Vite automatically finds "index"
import router from "@/router/index.js";

// Pass a root component
// .mount takes the place where the Vue application will be mounted as an argument
createApp(App)
    .use(router)
    .mount("#app");
// #app = <div id="app"></div> in index.html
