const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Middleware: obsługa błędów
app.use(errorHandler);

// Start servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
