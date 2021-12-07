export default function isLoggedIn({ next, store }) {
  if (store.$jwt.getToken()) {
    next("/");
  }
}
