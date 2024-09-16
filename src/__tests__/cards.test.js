import { app, server } from "../server.js";
import request from "supertest";
import mongoose from "mongoose";

import jest from "jest";

import { CardModel } from "../models/card.model.js";
import { getAllCarts } from "../controllers/card.controller.js";


describe('Get all cards.', () => {
    /*
    beforeEach(() => {
        jest.mock("../models/card.model.js");
    });
    */

    test('should return 200 and the list of cards', async() => {

        // const mockResponse = await getAllCarts();

        // CardModel.find.mockResolvedValue(mockResponse);

        const response = await request(app).get("/api/cards").send();
        console.log(response.body);

        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual(mockResponse);

    });

    afterAll(() => {
        mongoose.connection.close();
        server.close();
    })

});
