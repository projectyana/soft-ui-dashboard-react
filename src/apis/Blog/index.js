import { Service } from "services";

class BlogApi {
  get(data) {
    return Service.get("/bo/blog", data);
  }

  create(data) {
    return Service.post("/bo/blog", data);
  }

  update(id, data) {
    return Service.put(`/bo/blog/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/blog/${id}`);
  }
}

export default new BlogApi();
