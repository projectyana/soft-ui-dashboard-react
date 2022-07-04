import { Service } from "services";

class RoleApi {
  get(params) {
    return Service.get("/bo/access", { params });
  }

  create(data) {
    return Service.post("/bo/role", data);
  }

  update(id, data) {
    return Service.put(`/bo/role/${id}`, data);
  }

  delete(params) {
    return Service.delete("/bo/role/", { params });
  }
}


export default new RoleApi();
