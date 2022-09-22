import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import supertest from "supertest";
import createServer from '../src/app'

const app = createServer();
const gatewayId = new mongoose.Types.ObjectId().toString();

const gatewayPayload = {
    _id: gatewayId,
    serialNumber: "serialNumber",
    name: "Name",
    ip: "10.0.0.1",
};

const gatewayInput = {
    serialNumber: "serialNumber",
    name: "Name",
    ip: "10.0.0.1",
};

const gatewayInvalidInput = {
    serialNumber: "serialNumber",
    name: "Name",
    ip: "10.0.0.m",
};

jest.setTimeout(30000);

describe("Gateway", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("given the gateway does not exist", () => {
        it("should return a 404", async () => {
            await supertest(app).get(`/api/gateways/${gatewayId}`).expect(404);
        });
    });

    describe("Create gateway", () => {
        it("should return 200", async () => {
            const {statusCode, body} = await supertest(app).post(`/api/gateways/`).send(gatewayInput).expect(200);
            expect(body).toEqual({
                __v: 0,
                _id: expect.any(String),
                createdAt: expect.any(String),
                serialNumber: "serialNumber",
                name: "Name",
                ip: "10.0.0.1",
                updatedAt: expect.any(String),
            });
        });
    });

    describe("Create gateway", () => {
        it("should return 422 Name Already exists", async () => {
            await supertest(app).post(`/api/gateways/`).send(gatewayInput).expect(422);
        });
    });

    describe("Create gateway with invalid data", () => {
        it("should return 422", async () => {
            const {
                statusCode,
                body
            } = await supertest(app).post(`/api/gateways/`).send(gatewayInvalidInput).expect(400);
        });
    });

    describe("given the gateway details", () => {
        it("should return 200", async () => {
            const name = Math.random().toString(36).slice(2, 20);
            const {statusCode, body} = await supertest(app).post(`/api/gateways/`).send({
                serialNumber: "serialNumber",
                name,
                ip: "10.0.0.1",
            }).expect(200);
            const  gateway= await supertest(app).get(`/api/gateways/${body._id}`);
            expect(gateway.statusCode).toBe(200);
            expect(gateway.body._id).toBe(body._id);
        });
    });

    describe("Delete gateway", () => {
        it("should return 200", async () => {
            const name = Math.random().toString(36).slice(2, 20);
            const {statusCode, body} = await supertest(app).post(`/api/gateways/`).send({
                serialNumber: "serialNumber",
                name,
                ip: "10.0.0.1",
            }).expect(200);
            const  gateway= await supertest(app).delete(`/api/gateways/${body._id}`);
            expect(gateway.statusCode).toBe(200);
        });
    });


    describe("Get All gateway", () => {
        it("should return 200", async () => {
            await supertest(app).get(`/api/gateways`).expect(200);
        });
    });
});
