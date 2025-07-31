import { logMiddleware } from "./middlewares";
import Express from "express";
import router from "./routes/";
import path from 'node:path'; 

//Initialization du serveur express
const app = Express();
const PORT = 3004;

app.use(Express.static(path.join(__dirname, 'public')));

app.use(Express.json());

app.use(logMiddleware);

app.use("/", router)
/** Mise en place du moteur de rendu */
app.set("views", "./views/pages");
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