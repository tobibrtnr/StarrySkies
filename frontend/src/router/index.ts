/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 */

import { createRouter, createWebHistory, type Router } from "vue-router";
import StoreUser from "@/store/StoreUser";

let l_router: Router|null = null;

const router =
  () => {
  const 
  storeUser = StoreUser(),

    ifNotAuthorized = 
      (_to: unknown, _from: unknown, next: ((s?: string ) => void)) => 
      { if (storeUser.isNotAuthorized) { next() } else { next('/') } },

    ifAuthorized = 
      (_to: unknown, _from: unknown, next: ((s?: string ) => void)) => 
      { if (storeUser.isAuthorized) { next() } else {next('/login')} },
    
    routes = [
      { path: "/", 
        name: "Home",
        component: () => import("@/view/ViewHome.vue"),
      },
      {
        beforeEnter: ifNotAuthorized,
        path: "/login",
        name: "Login",
        component: () => import("@/view/account/ViewLogin.vue"),
      },
      { 
        beforeEnter: ifNotAuthorized,
        path: "/register",
        name: "Register",
        component: () => import("@/view/account/ViewRegister.vue"),
      },
      { 
        beforeEnter: ifAuthorized,
        path: "/settings",
        name: "Settings",
        component: () => import("@/view/account/ViewSettings.vue"),
      },
      { 
        beforeEnter: ifAuthorized,
        path: "/upload",
        name: "Upload",
        component: () => import("@/view/account/ViewUpload.vue"),
      },
      { 
        beforeEnter: ifAuthorized,
        path: "/collection/accounts",
        name: "Account Collection",
        component: () => import("@/view/collect/ViewAccountCollection.vue"),
      },
      { 
        beforeEnter: ifAuthorized,
        path: "/collection/images",
        name: "Image Collection",
        component: () => import("@/view/collect/ViewImageCollection.vue"),
      },
      {
        path: "/:profile",
        name: "Profile",
        component: () => import("@/view/profile/ViewProfile.vue"),
      },
      {
        path: "/image/:image_id",
        name: "Image",
        component: () => import("@/view/profile/ViewImage.vue"),
      },
      {
        path: "/:pathMatch(.*)",
        component: () => import("@/view/ViewError404.vue"),
      },
    ]
    
    if (l_router == null)
    { l_router = createRouter({ history: createWebHistory(), routes })}
    return l_router
  }

export default router
