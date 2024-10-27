const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectToDatabase = require('./config/db-connection');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const loadCategories = require('./utils/loadCategories');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB and load initial data
ConnectToDatabase().then(loadCategories);

// Define routes
app.use('/api/users', userRoutes);
app.use('/api', categoryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
