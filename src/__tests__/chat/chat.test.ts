import request from "supertest";
import { app } from "../../app";

describe("Chat routes", () => {
    test('get all chats without login', async () => {
            const res = await request(app).get("/api/v0/chat/all")

            expect(res.status).toEqual(401)

            expect(res.text).toEqual("Not authorized, token not found")
    });

})

