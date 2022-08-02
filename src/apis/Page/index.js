
import { Service } from "services";

class PageApi {
  get(params) {
    return Service.get("/bo/page", { params });
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
