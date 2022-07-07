
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

  delete(id) {
    return Service.delete(`/bo/user/${id}`);
  }
}

export default new UserApi();
