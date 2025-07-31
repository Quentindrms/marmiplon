import { logMiddleware } from "./middlewares";
import Express from "express";
import router from "./routes/";
import path from 'node:path'; 
import { fileURLToPath } from 'node:url';

const app = Express();
const Port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static(path.join(__dirname, 'public')));

app.use(Express.json());
app.use(logMiddleware);

app.set("views", path.join(__dirname, "views", "pages"));
app.set('view engine', 'ejs');

app.use("/", router);

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
