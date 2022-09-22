import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Gateway, {GatewayDocument} from "../model/gateway.model";

export function createGateway(input: DocumentDefinition<GatewayDocument>) {
    return Gateway.create(input);
}

export function findGateway(
    query: FilterQuery<GatewayDocument>,
    options: QueryOptions = {lean: true}
) {
    return Gateway.findOne(query, {}, options).select(['_id','name','serialNumber','ip']);
}

export function findAllGateway(
    query: FilterQuery<GatewayDocument>,
    options: QueryOptions = {lean: true}
) {
    return Gateway.find(query, {}, options).populate("devices");
}

export function getGatewaysCount(
    query: FilterQuery<GatewayDocument>
) {
    return Gateway.countDocuments(query);
}

export function findAndUpdate(
    query: FilterQuery<GatewayDocument>,
    update: UpdateQuery<GatewayDocument>,
    options: QueryOptions
) {
    return Gateway.findOneAndUpdate(query, update, options);
}

export function deleteGateway(query: FilterQuery<GatewayDocument>) {
    return Gateway.deleteOne(query);
}

export function getGatewayDropdown(
    query: FilterQuery<GatewayDocument>,
    options: QueryOptions = {lean: true}
) {
    return Gateway.find(query, {}, options).select(['_id','name']);
}
