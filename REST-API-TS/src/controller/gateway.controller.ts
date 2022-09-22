import {Request, Response} from "express";
import {get} from "lodash";
import {
    createGateway,
    findGateway,
    findAndUpdate,
    deleteGateway,
    getGatewaysCount,
    findAllGateway
} from "../service/gateway.service";
import HttpStatusCode from '../utils/HttpStatusCode'

export async function getAllGatewayHandler(req: Request, res: Response) {

    const Gateways = await findAllGateway({});
    return res.send(Gateways);
}

export async function createGatewayHandler(req: Request, res: Response) {
    try {
        const body = req.body;

        const GatewayExists = await getGatewaysCount({name: body.name});
        if (GatewayExists > 0) {
            return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(['Gateway Name Already Exists'])
        }

        const Gateway = await createGateway({...body});

        return res.send(Gateway);
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function updateGatewayHandler(req: Request, res: Response) {
    const GatewayId = get(req, "params.gatewayId");
    const update = req.body;

    const GatewayExists = await getGatewaysCount({name: update.name, _id: {$ne: GatewayId}});
    if (GatewayExists > 0) {
        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(['Gateway Name Already Exists'])
    }

    const Gateway = await findGateway({_id: GatewayId});

    if (!Gateway) {
        return res.sendStatus(404);
    }

    const updatedGateway = await findAndUpdate({_id: GatewayId}, update, {new: true});

    return res.send(updatedGateway);
}

export async function getGatewayHandler(req: Request, res: Response) {
    const _id = get(req, "params.gatewayId");
    const Gateway = await findGateway({_id});

    if (!Gateway) {
        return res.sendStatus(404);
    }

    return res.send(Gateway);
}

export async function deleteGatewayHandler(req: Request, res: Response) {
    // const userId = get(req, "user._id");
    const GatewayId = get(req, "params.gatewayId");

    const Gateway = await findGateway({_id: GatewayId});

    if (!Gateway) {
        return res.sendStatus(404);
    }

    // if (String(Gateway.user) !== String(userId)) {
    //   return res.sendStatus(401);
    // }

    await deleteGateway({_id: GatewayId});

    return res.sendStatus(200);
}
