import { Service } from "services";

class PressRelease {
  get(params) {
    return Service.get("/bo/press_release", { params });
  }

  create(data) {
    return Service.post("/bo/press_release", data);
  }

  update(id, data) {
    return Service.put(`/bo/press_release/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/press_release/${id}`);
  }

  export() {
    return Service.get("/bo/press_release/export");
  }
}


export default new PressRelease();
