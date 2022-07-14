
import { Service } from "services";

class CarouselApi {
  upload(data) {
    return Service.post("/bo/carousel/upload", data);
  }

  get(data) {
    return Service.get("/bo/carousel", data);
  }

  create(data) {
    return Service.post("/bo/carousel", data);
  }

  update(id, data) {
    return Service.put(`/bo/carousel/${id}`, data);
  }

  delete(id) {
    return Service.delete(`/bo/carousel/${id}`);
  }
}


export default new CarouselApi();
