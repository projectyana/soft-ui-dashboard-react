
import { Service } from "services";

class PageApi {
  get(data) {
    return Service.get("/bo/page", data);
  }

  create(data) {
    return Service.post("/bo/page", data);
  }

  update(id, data) {
    return Service.put(`/bo/page/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/page/${id}`);
  }
}

export default new PageApi();
