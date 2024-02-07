import { Schema, Types, model } from "mongoose";

interface IChat {
    type: String,
    participants: Types.ObjectId[],
    created_at: Date
}

const chatSchema = new Schema<IChat>({
    type: { type: String, default: 'one_to_one' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now }
})

const Chat = model<IChat>('Chat', chatSchema)

export default Chat