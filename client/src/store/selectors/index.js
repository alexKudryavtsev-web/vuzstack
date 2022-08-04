export function getIsAuth(state) {
  return state?.user?.isAuth || false;
}

export function getUser(state) {
  return state?.user?.user || {};
}
