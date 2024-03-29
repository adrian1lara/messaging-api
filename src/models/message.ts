import { Schema, Types, model  } from "mongoose";

interface IMessage {
    content: String,
    chat: Types.ObjectId,
    sender: Types.ObjectId,
    read_by: Types.ObjectId[],
    timestamp: Date,
    attachment?: [
        {
            type: String,
            url: String
        }
    ]
}

const messageSchema = new Schema<IMessage>({
    content: { type: String, required: true },
    chat: {type: Schema.Types.ObjectId, ref: 'Chat'},
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    read_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
    attachment: [
        {
            type: String,
            url: String
        }
    ]
})

const Message = model<IMessage>('Message', messageSchema)

export default Message


