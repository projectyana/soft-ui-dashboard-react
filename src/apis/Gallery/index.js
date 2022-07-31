import { Service } from "services"

class GalleryApi {
    create(data) {
        return Service.post("/bo/gallery", data)
    }

    addFile(data) {
        return Service.post(`/bo/gallery/${galleryId}/add`, data)
    }

    get(data) {
        return Service.get("/bo/gallery", data);
    }

    getById(id, data) {
        return Service.post(`/bo/gallery/${id}`, data);
    }

    update(id, data) {
        return Service.put(`/bo/gallery/${id}`, data);
    }

    delete(id) {
        return Service.delete(`/bo/gallery/${id}`);
    }

}

export default new GalleryApi()