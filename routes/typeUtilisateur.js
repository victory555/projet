const express = require('express');
const router = express.Router();
const TypeUtilisateur = require('../models/TypeUtilisateur');

router.get('/', (req, res) => {
    TypeUtilisateur.getAll((err, results) => {
        if (err) throw err;
        res.render('typeUtilisateur', { typesUtilisateurs: results });
    });
});

router.get('/add', (req, res) => {
    res.render('ajouter_typeUtilisateur');
});

router.post('/add', (req, res) => {
    TypeUtilisateur.add(req.body, (err) => {
        if (err) throw err;
        res.redirect('/typeUtilisateur');
    });
});

router.get('/edit/:id', (req, res) => {
    TypeUtilisateur.getById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render('modifier_typeUtilisateur', { typeUtilisateur: result[0] });
    });
});

router.post('/edit/:id', (req, res) => {
    TypeUtilisateur.update(req.params.id, req.body, (err) => {
        if (err) throw err;
        res.redirect('/typeUtilisateur');
    });
});

router.get('/delete/:id', (req, res) => {
    TypeUtilisateur.delete(req.params.id, (err) => {
        if (err) throw err;
        res.redirect('/typeUtilisateur');
    });
});

module.exports = router;
