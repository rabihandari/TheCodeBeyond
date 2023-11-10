import dotenv from 'dotenv';

dotenv.config();

// Dynamic env
export const BACKEND_HOST = process.env.NODE_ENV == "production" ? process.env.BACKEND_HOST : "http://localhost:5000/api";
export const FRONTEND_HOST = process.env.NODE_ENV == "production" ? process.env.FRONTEND_HOST : "http://localhost:3000";

// Static env
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET_OR_KEY = process.env.SECRET_OR_KEY;
export const SECRET_OR_KEY2 = process.env.SECRET_OR_KEY2;
export const EMAIL_SECRET = process.env.EMAIL_SECRET;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASS = process.env.GMAIL_PASS;
export const PASSWORD_SECRET = process.env.PASSWORD_SECRET;