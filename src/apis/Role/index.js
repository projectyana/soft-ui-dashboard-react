import { Service } from "services";

class RoleApi {
  get(data) {
    return Service.get("/bo/role", data);
  }

  create(data) {
    return Service.post("/bo/role", data);
  }

  update(id, data) {
    return Service.put(`/bo/role/${id}`, data);
  }

  getRoleAccess(id) {
    return Service.get(`/bo/role/${id}/access`);
  }

  setRoleAccess(id, data) {
    return Service.get(`/bo/role/${id}/access`, data);
  }

  delete(id) {
    return Service.delete(`/bo/role/${id}`);
  }
}


export default new RoleApi();
