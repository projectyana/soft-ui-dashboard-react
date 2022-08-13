
import { Service } from "services";

class FileUploadApi {
  get() {
    return Service.get("/bo/document");
  }

  create(id, data) {
    return Service.post(`/bo/doc_gallery/${id}/add`, data);
  }

  createCategory(data) {
    return Service.post('/bo/doc_gallery', data);
  }

  createSubCategory(id, data) {
    return Service.post(`/bo/doc_gallery/${id}`, data);
  }

  updateCategory(id, data) {
    return Service.put(`/bo/doc_gallery/${id}`, data);
  }

  delete(id, data) {
    return Service.post(`/bo/doc_gallery/${id}/remove`, data);
  }

  deleteCategory(id) {
    return Service.delete(`/bo/doc_gallery/${id}`);
  }

  dropdownCategory() {
    return Service.get('/bo/doc_gallery');
  }
}


export default new FileUploadApi();
