import express from 'express';
import morgan from 'morgan'
import supabase from '../auth-service/db.js';

const dbRouter = express.Router();

// add anime to liked anime list
dbRouter.post("/addAnime", async (req, res) => {
    // check if the anime is already in the database for this user
    const user_id = req.body.user_id;
    const anime_object = req.body.anime_object;
    
    const { data: existingAnime, error: selectError } = await supabase
        .from('liked_anime')
        .select('*')
        .eq('user_id', user_id)
        .eq('anime_object', JSON.stringify(anime_object));

    if (selectError) {
        return res.status(500).json({ error: selectError.message || 'Internal Server Error' });
    }

    // If the anime already exists for this user, handle it accordingly
    if (existingAnime && existingAnime.length > 0) {
        return res.status(400).json({ error: 'Anime already exists in the user\'s liked anime list' });
    }

    // If the anime doesn't exist, proceed with the insertion
    const { data, error } = await supabase
        .from('liked_anime')
        .insert([
            { user_id, anime_object },
        ])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    return res.status(200).json(data);        
});

// remove anime from liked anime list
dbRouter.post("/deleteAnime", async (req, res) => {
    const user_id = req.body.user_id;
    const anime_object = req.body.anime_object;

    const { data, error } = await supabase
        .from('liked_anime')
        .delete()
        .eq('user_id', user_id)
        .eq('anime_object', JSON.stringify(anime_object));

    if (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    return res.status(200).json(data);
});

// get liked anime list for user
dbRouter.post("/getLikedAnime", async (req, res) => {
    let { data: liked_anime, error } = await supabase
        .from("liked_anime")
        .select("*")
        .eq("user_id", req.body.user_id);

    if (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    return res.status(200).json(liked_anime);
});

export default dbRouter;

