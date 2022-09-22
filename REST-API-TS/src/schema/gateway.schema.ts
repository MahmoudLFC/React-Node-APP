import {object, string} from "yup";

const payload = {
    body: object({
        serialNumber: string().required("serial Number is required"),
        name: string().required("Name is required"),
        ip: string().required("IP is required")
            .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
                message: 'Invalid IP address',
                excludeEmptyString: true
            }).test('ip', 'Invalid IP address', value => {
                return value === undefined || value.trim() === ''
                    ? true
                    : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
            }),
    }),
};

const params = {
    params: object({
        gatewayId: string().required("gatewayId is required"),
    }),
};

export const createGatewaySchema = object({
    ...payload,
});

export const updateGatewaySchema = object({
    ...params,
    ...payload,
});

export const deleteGatewaySchema = object({
    ...params,
});
