const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const classTypeRoute = require('./routes/classType');
const coachesRoute = require('./routes/coaches');
const studentsRoute = require('./routes/students');

app.use('/classType', classTypeRoute);
app.use('/coaches', coachesRoute);
app.use('/students', studentsRoute);

// Test route
app.get('/', (req, res) => res.send('MMA Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
