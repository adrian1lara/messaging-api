import express, {Request, Response, NextFunction, Application} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import chatRouter from './routes/chatRoutes';
import user_chatRouter from './routes/user_chatRoutes';
import messageRouter from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorMiddleware'
import { Server } from 'socket.io'
import { createServer } from 'http'


export const app: Application = express();
export const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3001', 'https://chatty-branch.vercel.app'],
    methods:['GET','POST']
  }
})


app.use(cors({
  origin: ["https://chatty-api.fly.dev", "http://localhost:3001", 'https://chatty-branch.vercel.app'],
  credentials: true,
})) 

app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/v0/user", userRoutes)
app.use("/api/v0/chat", chatRouter)
app.use("/api/v0/user_chat", user_chatRouter)
app.use("/api/v0/message", messageRouter )

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})


export interface CustomError extends Error { 
    statusCode?: number;
  }
  

app.use(errorHandler)

app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: CustomError = new Error('Not found');
    error.statusCode = 404;
    next(error);
  }); 
  app.use((err: CustomError, _: Request, res: Response) => { 
    const statusCode = err.statusCode || 500; 
    const name = err.name || 'Error'; 
    res 
      .status(statusCode) 
      .json({ name, message: err.message }); 
  }); 

