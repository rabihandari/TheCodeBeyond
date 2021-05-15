import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DATABASE_URL, FRONTEND_HOST } from './config/config.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import otherRoutes from './routes/others.js';

const app = express();


// Configure middlewares
app.use(cors({ origin: FRONTEND_HOST, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Configure routes
app.use('/uploads', express.static('uploads'));
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/', otherRoutes);

// Connect to the database
const CONNECTION_URL =  process.env.NODE_ENV == "production" ? DATABASE_URL : 'mongodb://localhost:27017/thecodebeyond';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);