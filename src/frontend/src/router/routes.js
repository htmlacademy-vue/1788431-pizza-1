import { isLoggedIn, auth } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Builder",
    component: () => import("@/views/Builder.vue"),
    meta: { layout: "AppLayoutMain" },
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/profile",
    name: "UserData",
    component: () => import("@/views/UserData.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/login",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
    meta: { layout: "AppLayoutEmpty", middlewares: [isLoggedIn] },
  },
];
