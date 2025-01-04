import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorHandler from './src/middleware/errorHandler.js';
import './src/config/db.js'
import authRoutes from './src/route/authRoutes.js'

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
