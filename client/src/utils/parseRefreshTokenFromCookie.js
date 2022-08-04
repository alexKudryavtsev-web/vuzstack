function parseRefreshTokenFromCookie() {
  let match = document.cookie.match(new RegExp(`(^| )refreshToken=([^;]+)`));
  if (match) return match[2];

  return match ? match[2] : null;
}

export default parseRefreshTokenFromCookie;
