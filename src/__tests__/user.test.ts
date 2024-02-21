import { Request, Response } from "express";
import User from "../models/user";
import * as userController from "../controllers/userController"

describe("createUser", () => {
    it('should add email, username and password to the user', async () => {
            /**
     * Spy on the model save function and return a completed promise.
     * We are not testing the model here, only the controller so this is ok.
     */

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
