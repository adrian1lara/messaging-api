import { Schema, Types, model  } from "mongoose";

interface User_Chat {
    user: Types.ObjectId,
    chat: Types.ObjectId,
    joined_at: Date
}

const user_chatSchema = new Schema<User_Chat>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    joined_at: { type: Date, default: Date.now }
})

const User_Chat = model<User_Chat>('User_Chat', user_chatSchema)

export default User_Chat