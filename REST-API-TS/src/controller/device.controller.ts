import {Request, Response} from "express";
import {get} from "lodash";
import {
    createDevice,
    findDevice,
    findAndUpdate,
    deleteDevice,
    findAll,
    getDevicesCount
} from "../service/device.service";

import {
    findGateway
} from "../service/gateway.service";
import HttpStatusCode from "../utils/HttpStatusCode";

export async function createDeviceHandler(req: Request, res: Response) {
    const body = req.body;
    const DeviceExists = await getDevicesCount({vendor: body.vendor, gateway: body.gateway});
    if (DeviceExists > 0) {
        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(['Device vendor Already Exists'])
    }

    const device = await createDevice({...body});

    return res.send(device);
}

export async function updateDeviceHandler(req: Request, res: Response) {
    const deviceId = get(req, "params.deviceId");
    const update = req.body;

    const DeviceExists = await getDevicesCount({vendor: update.vendor, gateway: update.gateway, _id: {$ne: deviceId}});
    if (DeviceExists > 0) {
        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(['Device vendor Already Exists'])
    }
    const device = await findDevice({_id: deviceId});

    if (!device) {
        return res.sendStatus(404);
    }

    const updatedDevice = await findAndUpdate({_id: deviceId}, update, {new: true});

    return res.send(updatedDevice);
}

export async function getDeviceHandler(req: Request, res: Response) {
    const deviceId = get(req, "params.deviceId");
    const device = await findDevice({_id: deviceId});

    if (!device) {
        return res.sendStatus(404);
    }

    return res.send(device);
}

export async function getAllDevicesHandler(req: Request, res: Response) {
    const gatewayId = get(req, "query.gateway");
    const devices = await findAll({gateway: gatewayId});
    const gateway = await findGateway({_id: gatewayId});
    return res.send({devices, gateway});
}

export async function deleteDeviceHandler(req: Request, res: Response) {

    const deviceId = get(req, "params.deviceId");
    const device = await findDevice({_id: deviceId});

    if (!device) {
        return res.sendStatus(404);
    }
    await deleteDevice({_id: deviceId});

    return res.sendStatus(200);
}
