import {object, string, mixed, number} from "yup";

enum StatusEnum {
    online = "online",
    offline = "offline"
}

const payload = {
    body: object({
        uID: number().required("UID is required"),
        vendor: string().required("Vendor is required"),
        status: mixed<StatusEnum>().oneOf(Object.values(StatusEnum)).required("status is required"),
    }),
};

const params = {
    params: object({
        deviceId: string().required("Device Id is required"),
    }),
};

export const createDeviceSchema = object({
    ...payload,
});

export const updateDeviceSchema = object({
    ...params,
    ...payload,
});

export const deleteDeviceSchema = object({
    ...params,
});
