import { Service } from "services";

class GalleryApi {
  create(data) {
    return Service.post("/bo/gallery", data);
  }

  addFile(id, data) {
    return Service.post(`/bo/gallery/${id}/add`, data);
  }

  getGalleryCategories(data) {
    return Service.get("/bo/gallery", data);
  }

  getSingleGallery(id, data) {
    return Service.get(`/bo/gallery/${id}`, data);
  }

  removeImageGallery(id, data) {
    return Service.post(`/bo/gallery/${id}/remove`, data);
  }

  getFiles(params) {
    return Service.get('/bo/document', { params });
  }

  update(id, data) {
    return Service.put(`/bo/gallery/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/gallery/${id}`);
  }

}

export default new GalleryApi();