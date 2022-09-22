import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Device, { DeviceDocument } from "../model/device.model";
import Gateway, {GatewayDocument} from "../model/gateway.model";

export function createDevice(input: DocumentDefinition<DeviceDocument>) {
  return Device.create(input);
}

export function findDevice(
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true }
) {
  return Device.findOne(query, {}, options).populate('Gateway');
}

export function findAll(
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true }
) {
  return Device.find(query, {}, options)
      .populate('Gateway','name')
      .select(['_id','vendor','status','uID','createdAt']);
}

export function findAndUpdate(
  query: FilterQuery<DeviceDocument>,
  update: UpdateQuery<DeviceDocument>,
  options: QueryOptions
) {
  return Device.findOneAndUpdate(query, update, options);
}

export function deleteDevice(query: FilterQuery<DeviceDocument>) {
  return Device.deleteOne(query);
}

export function getDevicesCount(
    query: FilterQuery<GatewayDocument>
) {
  return Device.countDocuments(query);
}
