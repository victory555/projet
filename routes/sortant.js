const express = require('express');
const router = express.Router();
const CourrierSortant = require('../models/CourrierSortant');

router.get('/', (req, res) => {
    CourrierSortant.getAll((err, results) => {
        if (err) throw err;
        res.render('sortant', { courriers: results });
    });
});

router.get('/add', (req, res) => {
    res.render('ajouter_sortant');
});

router.post('/add', (req, res) => {
    CourrierSortant.add(req.body, (err) => {
        if (err) throw err;
        res.redirect('/sortant');
    });
});

router.get('/edit/:id', (req, res) => {
    CourrierSortant.getById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render('modifier_sortant', { courrier: result[0] });
    });
});

router.post('/edit/:id', (req, res) => {
    CourrierSortant.update(req.params.id, req.body, (err) => {
        if (err) throw err;
        res.redirect('/sortant');
    });
});

router.get('/delete/:id', (req, res) => {
    CourrierSortant.delete(req.params.id, (err) => {
        if (err) throw err;
        res.redirect('/sortant');
    });
});

module.exports = router;
