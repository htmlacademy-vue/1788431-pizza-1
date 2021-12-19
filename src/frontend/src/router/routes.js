import { isLoggedIn, auth } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Builder",
    component: () => import("@/views/BuilderView.vue"),
    meta: { layout: "AppLayoutMain" },
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/CartView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/OrdersView.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/profile",
    name: "UserData",
    component: () => import("@/views/UserDataView.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/login",
    name: "SignIn",
    component: () => import("@/views/SignInView.vue"),
    meta: { layout: "AppLayoutEmpty", middlewares: [isLoggedIn] },
  },
];
