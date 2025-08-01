import { logMiddleware } from "./middlewares";
import Express from "express";
import router from "./routes/";
import path from 'node:path'; 

import { fileURLToPath } from 'node:url';

const app = Express();
const PORT = 3004;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static(path.join(__dirname, 'public')));

app.use(Express.json());

app.use(logMiddleware);

app.set("views", path.join(__dirname, "views", "pages"));
app.set('view engine', 'ejs');

//declaration à l'app express
app.use("/", router)

app.get("/recipe", (req, res) => {
  res.render("recipePage");
});

//demarrer le serveur express

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

