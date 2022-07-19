import { Service } from "services";

class LivestreamApi {
  get() {
    return Service.get("/bo/livestream/current");
  }

  start(data) {
    return Service.post("/bo/livestream/start", data);
  }

  end() {
    return Service.put("/bo/livestream/end");
  }
}


export default new LivestreamApi();
