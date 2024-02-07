import 'dotenv/config'
import app from "./app"
import connect  from "./DB/connection"

connect()

const port = process.env.PORT || 3000;
app.listen(port,
  () => console.log(`App is listening on http://localhost:${port}`)
);


