
import { Service } from "services";

class HealthComicApi {
  get() {
    return Service.get("/bo/document");
  }

  create(data) {
    return Service.post("/bo/document/add", data);
  }

  delete(data) {
    return Service.post('/bo/document/remove', data);
  }
}


export default new HealthComicApi();
