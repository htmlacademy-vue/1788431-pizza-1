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
    meta: { layout: "AppLayoutMain", middlewares: [auth] },
    children: [
      {
        path: "ordered",
        name: "CartOrdered",
        component: () => import("@/views/Thanx.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/user-data",
    name: "UserData",
    component: () => import("@/views/UserData.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [auth] },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
    meta: { layout: "AppLayoutEmpty", middlewares: [isLoggedIn] },
  },
];
