export function getIsAuth(state) {
  return state?.user?.isAuth || false;
}

export function getIsFailed(state) {
  return state?.user?.isFailed || null;
}

export function getUser(state) {
  return state?.user?.user || {};
}

export function getAcceptedWithCookie(state) {
  return state?.user?.user.acceptedWithCookie || false;
}
