import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import { DATABASE_URL } from './config/config.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

// Configure middlewares
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// Configure routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Connect to the database
const CONNECTION_URL =  process.env.LOCAL_DATABASE_URL || DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);