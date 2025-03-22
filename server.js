const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const setupSwagger = require('./swagger');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
setupSwagger(app); // Add Swagger UI

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
});
