import {string, object} from "yup";

export const GatewayValidator = object().shape({
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
});
