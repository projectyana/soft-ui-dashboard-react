import { Service } from "services";

class AuthApi {
  signIn(data) {
    return Service.post("/auth/login", data);
  }
}

export default new AuthApi();
