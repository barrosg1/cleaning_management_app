import setAuthToken from "./setAuthToken";
class Auth {
  static authenticateUser(tokenName, token) {
    localStorage.setItem(tokenName, token);
    setAuthToken(token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem("jwtToken") != null;
  }

  static deauthenticateUser() {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
  }

  static getToken() {
    return localStorage.getItem("token");
  }
}

export default Auth;
