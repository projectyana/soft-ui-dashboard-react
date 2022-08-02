import { Service } from "services";

class RecentInfo {
  get(params) {
    return Service.get("/bo/recent_info", { params });
  }

  create(data) {
    return Service.post("/bo/recent_info", data);
  }

  update(id, data) {
    return Service.put(`/bo/recent_info/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/recent_info/${id}`);
  }
}

export default new RecentInfo();
