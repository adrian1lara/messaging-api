import supertest from "supertest";
import { describe } from "node:test";
import { app } from "../app";
import { userInput } from "./fixtures/user.fixture";
import mongoose from "mongoose";
import connect from "../DB/connection";

/** 
describe("createUser", () => {
    it('should add email, username and password to the user', async () => {
            /**
     * Spy on the model save function and return a completed promise.
     * We are not testing the model here, only the controller so this is ok.
     

        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve())

        const newUser = { email: 'test@example.com', username: 'testuser', password: 'validPassword' };

        // Create a mock request and set type any to ignore type checking
        
        const mockRequest: any = {
            body: newUser
        }

        const mockResponse: any = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        await userController.createUser(mockRequest, mockResponse)


        expect(mockResponse.status).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(201)

    });

    it('should send complete all the fields', async () => {
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve())

        const newUser = { email: '', username: 'testuser', password: '' };

        const mockRequest: any = {
            body: newUser
        }

        const mockResponse: any = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.status).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(400)

        expect(mockResponse.send).toHaveBeenCalledTimes(1)
        expect(mockResponse.send).toHaveBeenCalledWith("All fields are required")
    });
})
*/
describe('user', () => {
    beforeEach(async () => {
        await connect()
    })

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
      });

        describe("given the email, username and password are valid", () => {

            it('should return a 201 status and the user payload', async () => {

                const res = await supertest(app).post("/api/v0/user/new")
                .send(userInput)

                expect(res.status).toBe(201)

                expect(res.body).toEqual({
                    "__v": 0,
                    "_id": expect.any(String),
                    "role": "user",
                    "email": "testUser@example.com",
                    "username": "Test User",
                    "password": expect.any(String),
                    "created_at": expect.any(String),
                })
            });
            
        })
    })
