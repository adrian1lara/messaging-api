import  {Schema, model } from 'mongoose'

interface IUser {
    _id: String,
    role: String,
    email: String,
    username: String,
    password: String,
    created_at: Date,
    avatar?: String
}

declare global {
    namespace Express {
      interface Request {
        user?: IUser | null;
      }
    }
  }


const userSchema = new Schema<IUser> ({
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    username : { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    avatar: {type: String, default: ''}
})

const User = model<IUser>('User', userSchema)

export default User

