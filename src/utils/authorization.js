const TOKEN_KEY = "persist:token";

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function cleanToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
