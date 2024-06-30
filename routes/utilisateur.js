// models/Utilisateur.js
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'courrier_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

const Utilisateur = {
    findByEmail: (email, callback) => {
        return connection.query('SELECT * FROM Utilisateur WHERE email = ?', [email], callback);
    },
}

module.exports = Utilisateur;
