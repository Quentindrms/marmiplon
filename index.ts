import { logMiddleware } from "./middlewares";
import Express from "express";
import router from "./routes/";
<<<<<<< HEAD
import path from 'node:path'; 
=======
import { fileURLToPath } from "node:url";
import path from "node:path";
>>>>>>> ed56cd8 (homepage.ejs)

import { fileURLToPath } from 'node:url';

const app = Express();
const PORT = 3004;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static(path.join(__dirname, 'public')));

app.use(Express.json());

app.use(logMiddleware);

<<<<<<< HEAD
app.set("views", path.join(__dirname, "views", "pages"));
app.set('view engine', 'ejs');

app.use("/", router);
=======
/** Mise en place du moteur de rendu */
// Déterminer l'emplacement du fichier index.ts à la racine du projet
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

// À l'aide du chemin du fichier index.ts, je détermine le chemin du dossier parent
const __dirname = path.dirname(__filename);

// J'indique à Express d'utiliser le moteur de template EJS
app.set("view engine", "ejs");

// J'indique à EJS où trouver le dossier contenant mes vues
app.set("views", path.join(__dirname, "views"));

//declaration à l'app express
app.use("/", router)

//demarrer le serveur express
>>>>>>> ed56cd8 (homepage.ejs)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


