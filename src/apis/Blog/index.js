import { Service } from "services";

class BlogApi {
  get(params) {
    return Service.get("/bo/blog", { params });
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

  upload(data) {
    return Service.post("/bo/blog/upload", data);
  }

  getTags() {
    return Service.get("/bo/blog/tags");
  }
}

export default new BlogApi();
