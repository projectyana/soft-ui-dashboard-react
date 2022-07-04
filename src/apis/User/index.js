
import { Service } from "services";

class UserApi {
  get(params) {
    return Service.get("/bo/user", { params });
  }

  create(data) {
    return Service.post("/bo/user", data);
  }

  update(id, data) {
    return Service.put(`/bo/user/${id}`, data);
  }

  delete(params) {
    return Service.delete("/bo/user/", { params });
  }
}


export default new UserApi();
