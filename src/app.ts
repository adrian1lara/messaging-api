import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import chatRouter from './routes/chatRoutes';


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use("/users", userRoutes)
app.use("/api/v0/chat", chatRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})


export interface CustomError extends Error { 
    statusCode?: number;
  }
  

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