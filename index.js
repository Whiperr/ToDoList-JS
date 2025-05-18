const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/tasks', taskRoutes);

// Middleware: obsługa błędów
app.use(errorHandler);

// Start servera
const PORTLISEN = process.env.PORT || 3001;
app.listen(PORTLISEN, () =>
    console.log(`API server listening at http://localhost:${PORTLISEN}`)
);