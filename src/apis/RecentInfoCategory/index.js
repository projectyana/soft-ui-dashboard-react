
import { Service } from "services";

class RecentInfoCategoryApi {
  get(data) {
    return Service.get("/bo/recent_info_category", data);
  }

  create(data) {
    return Service.post("/bo/recent_info_category", data);
  }

  update(id, data) {
    return Service.put(`/bo/recent_info_category/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/recent_info_category/${id}`);
  }

  dropdown() {
    return Service.get("/bo/recent_info_category/dropdown");
  }
}


export default new RecentInfoCategoryApi();
