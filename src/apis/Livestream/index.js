import { Service } from "services";

class LivestreamApi {
  get() {
    return Service.get("/bo/livestream/current");
  }

  start(data) {
    return Service.post("/bo/livestream/start", data);
  }

  end() {
    return Service.post("/bo/livestream/end");
  }

  history() {
    return Service.get("/bo/livestream/history");
  }
}

export default new LivestreamApi();
