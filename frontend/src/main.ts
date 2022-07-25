/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This is the main file for the frontend. Here, the Vue App is
 * created with Pinia Stores, Router and Vuestic UI.
 */

import { createApp }     from "vue";
import { createPinia }   from "pinia";
import { createVuestic } from 'vuestic-ui'

import 'vuestic-ui/dist/vuestic-ui.css'
import vuesticConfig from "@/service/vuesticConfig"

import Router from "@/router";
import App    from "@/App.vue";

const 
  app = createApp(App),
  pinia = createPinia(),
  vst = createVuestic(vuesticConfig);

app.use(pinia)
   .use(vst)
   .use(Router())
   .mount("#app");
