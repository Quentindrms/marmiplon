import { logMiddleware } from "./middlewares";
import Express from "express";



const app = Express();
const Port = 3000;


app.use(Express.json());

app.use(logMiddleware);



app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});