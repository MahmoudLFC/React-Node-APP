import mongoose from "mongoose";
import {nanoid} from "nanoid";
import {GatewayDocument} from "./gateway.model";

export interface DeviceDocument extends mongoose.Document {
    gateway: GatewayDocument["_id"];
    uID: number;
    vendor: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const DeviceSchema = new mongoose.Schema(
    {
        gateway: {type: mongoose.Schema.Types.ObjectId, ref: "Gateway"},
        status: {type: String, enum: ['online', 'offline']},
        vendor: {type: String, default: true},
        uID: {type: Number, default: true}
    },
    {timestamps: true}
);

const Device = mongoose.model<DeviceDocument>("Device", DeviceSchema);

export default Device;
