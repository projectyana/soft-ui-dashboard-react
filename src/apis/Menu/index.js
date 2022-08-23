import { Service } from "services";

class MenuApi {
  getParent() {
    return Service.get("/bo/header_nav/parent");
  }

  getSingle(id) {
    return Service.get(`/bo/header_nav/${id}`);
  }

  getPageUnlinked() {
    return Service.get("/bo/page/unlinked");
  }

  getBlogUnlinked() {
    return Service.get("/bo/blog/unlinked");
  }

  create(data) {
    return Service.post("/bo/header_nav", data);
  }

  createSubmenu(id, data) {
    return Service.post(`/bo/header_nav/${id}`, data);
  }

  update(id, data) {
    return Service.put(`/bo/header_nav/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/header_nav/${id}`);
  }

  orderMove(id, direction) {
    return Service.post(`bo/header_nav/${id}/${direction}`);
  }
}

export default new MenuApi();
