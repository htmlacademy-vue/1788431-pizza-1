import { setAuth } from "@/common/helpers";

export default function auth({ next, store }) {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }
}
