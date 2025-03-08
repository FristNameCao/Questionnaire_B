/**
 * @description 用户token
 * @author 曹志
 */

const KEY = "USER_TOKEN";

export function setToken(token: string) {
  console.log("token", token);

  localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || "";
}

export function removeToken() {
  localStorage.removeItem(KEY);
}
