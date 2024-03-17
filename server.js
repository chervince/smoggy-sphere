const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "mysql-astro",
  user: "root",
  password: "Anouwali_555",
  database: "astrodb1",
});

// Connecter à la base de données
db.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL");
});

const app = express();
const port = 4321;

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour gérer les soumissions de formulaire
app.post("/api/submit-form", (req, res) => {
  const { nom, email, message } = req.body; // Remplacez ces champs par ceux de votre formulaire
  // Insérer les données dans la base de données
  const query = "INSERT INTO astrodb1 (nom, email, message) VALUES (?, ?, ?)";
  db.query(query, [nom, email, message], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données", err);
      res.status(500).send("Erreur lors de l'enregistrement du message");
    } else {
      res.send("Message enregistré avec succès");
    }
  });
});

// Sert les fichiers statiques du dossier 'dist'
app.use(express.static(path.join(__dirname, "dist")));

// Redirige toutes les routes non trouvées vers 'index.html'
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
