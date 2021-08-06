export default [
  {
    path: "/",
    name: "Builder",
    component: () => import("../views/Builder.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayoutUser" },
  },
  {
    path: "/user-data",
    name: "UserData",
    component: () => import("../views/UserData.vue"),
    meta: { layout: "AppLayoutUser" },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
];
