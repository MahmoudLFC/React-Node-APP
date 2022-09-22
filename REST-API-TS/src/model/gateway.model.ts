import mongoose from "mongoose";
import {nanoid} from "nanoid";

export interface GatewayDocument extends mongoose.Document {
    serialNumber: string;
    name: string;
    ip: string;
    createdAt: Date;
    updatedAt: Date;
}

const GatewaySchema = new mongoose.Schema(
    {
        serialNumber: {type: String, default: true},
        name: {type: String, default: true},
        ip: {type: String, default: true},
    },
    {timestamps: true}
);

GatewaySchema.virtual("devices", {
    ref: "Device",
    foreignField: "gateway",
    localField: "_id",
    count: true
});

const Gateway = mongoose.model<GatewayDocument>("Gateway", GatewaySchema);

export default Gateway;
