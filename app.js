const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'courrier'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Configuration du middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/ajouter_entrant', (req, res) => {
    db.query('SELECT * FROM CourrierEntrant', (err, results) => {
        if (err) throw err;
        res.render('ajouter_entrant', { courriers: results });
    });
});

app.get('/ajouter_utilisateur', (req, res) => {
    db.query('SELECT * FROM Utilisateur', (err, results) => {
        if (err) throw err;
        res.render('ajouter_utilisateur', { utilisateurs: results });
    });
});

app.get('/ajouter_sortant', (req, res) => {
    db.query('SELECT * FROM CourrierSortant', (err, results) => {
        if (err) throw err;
        res.render('ajouter_sortant', { courriers: results });
    });
});

app.get('/ajouter_typeUtilisateur', (req, res) => {
    db.query('SELECT * FROM TypeUtilisateur', (err, results) => {
        if (err) throw err;
        res.render('ajouter_typeUtilisateur', { typesUtilisateurs: results });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const motDePasse = req.body.motDePasse;

    if (email && motDePasse) {
        db.query('SELECT * FROM Utilisateur WHERE email = ? AND motDePasse = ?', [email, motDePasse], (err, results, fields) => {
            if (err) throw err;

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/menu');
            } else {
                res.send('Email ou mot de passe incorrect');
            }
            res.end();
        });
    } else {
        res.send('Veuillez saisir un email et un mot de passe');
        res.end();
    }
});

app.get('/menu', (req, res) => {
    if (req.session.loggedin) {
        res.render('menu');
    } else {
        res.send('Veuillez vous connecter pour voir cette page');
    }
    res.end();
});

// Ajouter les routes POST pour les formulaires
app.post('/typeUtilisateur/add', (req, res) => {
    const libelle = req.body.libelle;

    if (libelle) {
        db.query('INSERT INTO TypeUtilisateur (libelle) VALUES (?)', [libelle], (err, results) => {
            if (err) throw err;
            res.redirect('/ajouter_typeUtilisateur');
        });
    } else {
        res.send('Veuillez saisir un libellé');
        res.end();
    }
});

app.post('/sortant/add', (req, res) => {
    const { sujet, dateEnvoi, contenu, destinataire } = req.body;

    if (sujet && dateEnvoi && contenu && destinataire) {
        db.query('INSERT INTO CourrierSortant (sujet, dateEnvoi, contenu, destinataire) VALUES (?, ?, ?, ?)', 
        [sujet, dateEnvoi, contenu, destinataire], (err, results) => {
            if (err) throw err;
            res.redirect('/ajouter_sortant');
        });
    } else {
        res.send('Veuillez remplir tous les champs');
        res.end();
    }
});

app.post('/utilisateur/add', (req, res) => {
    const { nom, email, motDePasse, typeUtilisateur } = req.body;

    if (nom && email && motDePasse && typeUtilisateur) {
        db.query('INSERT INTO Utilisateur (nom, email, motDePasse, typeUtilisateur) VALUES (?, ?, ?, ?)', 
        [nom, email, motDePasse, typeUtilisateur], (err, results) => {
            if (err) throw err;
            res.redirect('/ajouter_utilisateur');
        });
    } else {
        res.send('Veuillez remplir tous les champs');
        res.end();
    }
});

app.post('/entrant/add', (req, res) => {
    const { sujet, dateReception, contenu, expediteur } = req.body;

    if (sujet && dateReception && contenu && expediteur) {
        db.query('INSERT INTO CourrierEntrant (sujet, dateReception, contenu, expediteur) VALUES (?, ?, ?, ?)', 
        [sujet, dateReception, contenu, expediteur], (err, results) => {
            if (err) throw err;
            res.redirect('/ajouter_entrant');
        });
    } else {
        res.send('Veuillez remplir tous les champs');
        res.end();
    }
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
