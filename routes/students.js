const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all students with class type
router.get('/', (req, res) => {
    const sql = `
        SELECT students.id, students.name, students.age, classType.name AS classType
        FROM students
        LEFT JOIN classType ON students.classTypeId = classType.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
});

// POST new student
router.post('/', (req, res) => {
    const { name, age, classTypeId } = req.body;
    if (!name || !age || !classTypeId) return res.status(400).json({ error: 'Name, age, and classTypeId are required' });

    db.query('INSERT INTO students (name, age, classTypeId) VALUES (?, ?, ?)', [name, age, classTypeId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database insert failed' });
        res.json({ message: 'Student added', id: result.insertId });
    });
});

module.exports = router;
