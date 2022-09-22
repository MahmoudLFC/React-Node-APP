import {Express} from "express";
import {
    getAllGatewayHandler,
    createGatewayHandler,
    deleteGatewayHandler,
    getGatewayHandler,
    updateGatewayHandler
} from "./controller/gateway.controller";

import {createGatewaySchema, deleteGatewaySchema, updateGatewaySchema} from "./schema/gateway.schema";

import {
    getAllDevicesHandler,
    createDeviceHandler,
    deleteDeviceHandler,
    getDeviceHandler,
    updateDeviceHandler
} from "./controller/device.controller";

import {createDeviceSchema, deleteDeviceSchema, updateDeviceSchema} from "./schema/device.schema";

import {
    getDropdown
} from "./controller/dropdown.controller";

import {validateRequest} from "./middleware";

export default function (app: Express) {

    // Get all GateWays
    app.get(
        "/api/gateways",
        getAllGatewayHandler
    );

    // Create a GateWay
    app.post(
        "/api/gateways",
        [validateRequest(createGatewaySchema)],
        createGatewayHandler
    );

    // Get a Gateway
    app.get("/api/gateways/:gatewayId", getGatewayHandler);

    // Update a Gateway
    app.put(
        "/api/gateways/:gatewayId",
        [ validateRequest(updateGatewaySchema)],
        updateGatewayHandler
    );

    // Delete a Gateway
    app.delete(
        "/api/gateways/:gatewayId",
        [ validateRequest(deleteGatewaySchema)],
        deleteGatewayHandler
    );



    // Get Gateway Devices
    app.get(
        "/api/devices",
        getAllDevicesHandler
    );

    // Create a Device
    app.post(
        "/api/devices",
        [validateRequest(createDeviceSchema)],
        createDeviceHandler
    );

    // Get a Device
    app.get("/api/devices/:deviceId", getDeviceHandler);

    // Update a Device
    app.put(
        "/api/devices/:deviceId",
        [ validateRequest(updateDeviceSchema)],
        updateDeviceHandler
    );

    // Delete a Device
    app.delete(
        "/api/devices/:deviceId",
        [ validateRequest(deleteDeviceSchema)],
        deleteDeviceHandler
    );

    // Get all GateWays
    app.get(
        "/api/dropdown/:model",
        getDropdown
    );
}
