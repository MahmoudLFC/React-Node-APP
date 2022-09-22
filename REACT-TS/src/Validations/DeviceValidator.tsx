import {string, object, mixed,number} from "yup";

enum StatusEnum {
    online = "online",
    offline = "offline"
}

export const DeviceValidator = object().shape({
    gateway: string().required("Gateway is required"),
    uID: number().required("UID is required"),
    vendor: string().required("Vendor is required"),
    status: mixed<StatusEnum>().oneOf(Object.values(StatusEnum)).required("status is required"),
});
