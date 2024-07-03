import http from "./httpService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const apiEndPoint = "/auth";
const jsonWebTokenKey = "jsonWebToken";

http.setJsonWebToken(getexpJsonWebToken());

export async function login(user) {
  const result = await http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
  });
  const { data: jsonWebToken, statusText } = result;
  localStorage.setItem(jsonWebTokenKey, jsonWebToken);
  toast(statusText);
}

export function logout() {
  localStorage.removeItem(jsonWebTokenKey);
}

export function getCurrentUser() {
  try {
    const jsonWebToken = localStorage.getItem(jsonWebTokenKey);
    const currentUser = jwtDecode(jsonWebToken);

    return currentUser;
  } catch (ex) {
    return null;
  }
}

export function loginWithJsonWebToken(jsonWebToken) {
  localStorage.setItem(jsonWebTokenKey, jsonWebToken);
}

export function getexpJsonWebToken() {
  return localStorage.getItem(jsonWebTokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJsonWebToken,
  getexpJsonWebToken
};
