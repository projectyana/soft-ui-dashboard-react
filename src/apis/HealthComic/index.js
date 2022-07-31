
import { Service } from "services";

class HealthComicApi {
  upload(data) {
    return Service.post("/bo/comic/upload", data);
  }

  get(data) {
    return Service.get("/bo/comic", data);
  }

  getSingle(id) {
    return Service.get(`/bo/comic/${id}`);
  }

  create(data) {
    return Service.post("/bo/comic", data);
  }

  update(id, data) {
    return Service.put(`/bo/comic/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/comic/${id}`);
  }
}


export default new HealthComicApi();
