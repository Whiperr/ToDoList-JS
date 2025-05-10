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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

