const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all coaches
router.get('/', (req, res) => {
    db.query('SELECT * FROM coaches', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
});

// POST new coach
router.post('/', (req, res) => {
    const { name, specialty } = req.body;
    if (!name || !specialty) return res.status(400).json({ error: 'Name and specialty are required' });

    db.query('INSERT INTO coaches (name, specialty) VALUES (?, ?)', [name, specialty], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database insert failed' });
        res.json({ message: 'Coach added', id: result.insertId });
    });
});

module.exports = router;
