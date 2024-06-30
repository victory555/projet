const express = require('express');
const router = express.Router();
const CourrierEntrant = require('../models/CourrierEntrant');

router.get('/', (req, res) => {
    CourrierEntrant.getAll((err, results) => {
        if (err) throw err;
        res.render('entrant', { courriers: results });
    });
});

router.get('/add', (req, res) => {
    res.render('ajouter_entrant');
});

router.post('/add', (req, res) => {
    CourrierEntrant.add(req.body, (err) => {
        if (err) throw err;
        res.redirect('/entrant');
    });
});

router.get('/edit/:id', (req, res) => {
    CourrierEntrant.getById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render('modifier_entrant', { courrier: result[0] });
    });
});

router.post('/edit/:id', (req, res) => {
    CourrierEntrant.update(req.params.id, req.body, (err) => {
        if (err) throw err;
        res.redirect('/entrant');
    });
});

router.get('/delete/:id', (req, res) => {
    CourrierEntrant.delete(req.params.id, (err) => {
        if (err) throw err;
        res.redirect('/entrant');
    });
});

module.exports = router;
