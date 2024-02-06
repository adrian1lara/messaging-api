import express, {Request, Response, Express} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})