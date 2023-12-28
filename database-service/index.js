import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv';
import dbRouter from './dbRouter.js'

dotenv.config()

const app = express();
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.send('Database Service');
})

app.use("/db", dbRouter)



// supabase


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});