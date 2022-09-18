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

export function getDirections(state) {
  return state?.user?.user.directions || [];
}

export function getMarks(state) {
  return state?.user?.user.marks || [];
}

export function getIsLoading(state) {
  return state?.user?.isLoading || false;
}

export function getExams(state) {
  return state?.settings?.exams || []
}

export function getMaxAmountDirection(state) {
  return state?.settings?.maxAmountDirection || []
}