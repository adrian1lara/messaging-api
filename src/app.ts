import express, {Request, Response, NextFunction, Application} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import chatRouter from './routes/chatRoutes';
import user_chatRouter from './routes/user_chatRoutes';
import messageRouter from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorMiddleware'


const app: Application = express();
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/v0/user", userRoutes)
app.use("/api/v0/chat", chatRouter)
app.use("/api/v0/user_chat", user_chatRouter)
app.use("/api/v0/message", messageRouter )

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
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


export default app