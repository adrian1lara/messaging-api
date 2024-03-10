import 'dotenv/config'
import {server} from "./app"
import connect  from "./DB/connection"

connect()
const port = process.env.PORT || 3000;
server.listen(port,
  () => console.log(`App is listening on http://localhost:${port}`)
);


