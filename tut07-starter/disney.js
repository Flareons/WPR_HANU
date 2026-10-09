"use strict";

const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware


const moviesPath = path.join(__dirname, 'movies.json');
// define 'add' endpoint here
app.post('/add', (req, res) => {
    const { movie, year, song, rating } = req.body;

    if (!movie || !year || !song || !rating) {
        return res.status(400).send('Missing required parameters');
    }

    try {
        const fileData = fs.readFileSync(moviesPath, 'utf8');
        const movies = JSON.parse(fileData);

        const movieKey = movie.toLowerCase();

        const isUpdate = Boolean(movies[movieKey]);

        movies[movieKey] = {
            "release-year": Number(year),
            "featured-song": song,
            "rotten-tomatoes": Number(rating)
        };

        fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

        if (isUpdate) {
            return res.send(`Updated info for: ${movieKey}`);
        } else {
            return res.status(201).send(`Added new movie: ${movieKey}`);
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error.');
    }
});

app.listen(8000);