import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston';
import supabase from './db.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 4000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

app.get('/', (req, res) => {
    res.send('Authentication and Database Service');
});

// supabase
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (data.user) {
            logger.info('Login successful', { user: data.user.email });
            res.status(200).json({
                success: true,
                user: data.user,
                session: data.session,
            });
        } else {
            logger.warn('Login failed', { error: error.message || 'Authentication failed', email });
            res.status(401).json({
                success: false,
                error: error.message || 'Authentication failed',
            });
        }
    } catch (error) {
        logger.error('Internal server error', { error: error.message });
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (data.user) {
            logger.info('Registration successful', { user: data.user.email });
            res.status(200).json({
                success: true,
                user: data.user,
                session: data.session,
            });
        } else {
            logger.warn('Registration failed', { error: error.message || 'Authentication failed', email });
            res.status(401).json({
                success: false,
                error: error.message || 'Authentication failed',
            });
        }
    } catch (error) {
        logger.error('Internal server error', { error: error.message });
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
