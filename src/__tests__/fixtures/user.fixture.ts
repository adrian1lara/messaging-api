import mongoose from "mongoose";

export const userId = new mongoose.Types.ObjectId().toString()
export const differentUserId = new mongoose.Types.ObjectId().toString()

export const userInput = {
    email: 'testUser@example.com',
    username: 'Test User',
    password: '123456'
}

export const credInput = {
    email: 'testUser@example.com',
    password: '123456'
}

export const userPayload = {
    _id: userId,
    email: 'testUser@example.com',
    username: 'Test User',
    role: 'user'
}

export const differentUserPayload = {
    _id: differentUserId,
    email: 'differenttestUser@example.com',
    username: 'different Test User',
    role: 'different role'
}