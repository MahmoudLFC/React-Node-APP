import http from "./HttpService";
import {array} from "yup";

const API_BASE_URL_ENV: string = import.meta.env.VITE_API_URL;

const apiDropdownEndpoint: string = API_BASE_URL_ENV + "/dropdown";

export default class BaseService {
    apiEndpoint: string

    constructor(apiEndPoint: string) {
        this.apiEndpoint = apiEndPoint;
    }

    entityUrl(params: any = []) {
        return `${this.apiEndpoint}/${params.join("/")}`;
    }

    dropDownUrl(model: string) {
        return `${apiDropdownEndpoint}/${model}`;
    }

    getList(params: any) {
        return http.get(this.apiEndpoint, {params});
    }

    find(id: any, params: any) {
        return http.get(this.entityUrl([id]), {params});
    }

    create(data: any) {
        return http.post(this.apiEndpoint, data);
    }

    update(id: any, data: object) {
        const body = {...data};
        return http.put(this.entityUrl([id]), body);
    }

    getDropDown(model: string, params: any = []) {
        return http.get(this.dropDownUrl(model), {params});
    }

    remove(id: any) {
        return http.delete(this.entityUrl([id]));
    }
}
