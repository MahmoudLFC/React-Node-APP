import BaseService from "./BaseService";

const API_BASE_URL_ENV: string = import.meta.env.VITE_API_URL;

const apiEndpoint: string = API_BASE_URL_ENV + "/gateways";

export default class extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
