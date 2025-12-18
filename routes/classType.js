const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all class types
router.get('/', (req, res) => {
    db.query('SELECT * FROM classType', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
});

// POST new class type
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    db.query('INSERT INTO classType (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database insert failed' });
        res.json({ message: 'Class type added', id: result.insertId });
    });
});

module.exports = router;
