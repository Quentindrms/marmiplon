import { logMiddleware } from "./middlewares";
import Express from "express";
import router from "./routes/";



const app = Express();
const Port = 3000;


app.use(Express.json());
app.use(logMiddleware);

/** Mise en place du moteur de rendu */
app.set('view engine', 'ejs');
app.use("/", router)

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});