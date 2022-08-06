/* eslint-disable */


import { Service } from "services"

class DocumentApi {
    add(data) {
        return Service.post("/bo/document/add", data)
    }

    remove(data) {
        return Service.post("/bo/document/remove", data)
    }
    get(data) {
        return Service.post("/bo/document", data)
    }


}

export default new DocumentApi()