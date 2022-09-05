
import { Service } from "services";

class FooterApi {
  getPage() {
    return Service.get("/bo/footer_nav");
  }

  getSingle(id) {
    return Service.get(`/bo/footer_nav/${id}`);
  }

  getPageUnlinked() {
    return Service.get("/bo/page/unlinked");
  }

  getBlogUnlinked() {
    return Service.get("/bo/blog/unlinked");
  }

  create(data) {
    return Service.post("/bo/footer_nav", data);
  }

  update(id, data) {
    return Service.put(`/bo/footer_nav/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/footer_nav/${id}`);
  }

  orderMove(id, direction) {
    return Service.post(`bo/footer_nav/${id}/${direction}`);
  }
}

export default new FooterApi();
