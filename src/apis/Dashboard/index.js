
import { Service } from "services";

class DashboardApi {
  get() {
    return Service.get("/bo/statistic");
  }
}

export default new DashboardApi();
