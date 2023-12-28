import express from 'express';
import morgan from 'morgan'

const loginRouter = express.Router();

loginRouter.use(morgan('dev'));

loginRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    data.user ? res.status(200).json({
                success: true,
                user: data.user,
                session: data.session,
            }) : res.status(401).json({
                success: false,
                error: error.message || 'Authentication failed',
            })
})

loginRouter.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    data.user ? res.status(200).json({
                success: true,
                user: data.user,
                session: data.session,
            }) : res.status(401).json({
                success: false,
                error: error.message || 'Authentication failed',
            })
});



export default loginRouter;