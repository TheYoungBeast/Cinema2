import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { assert } from 'console';

let screenings = {};
let movies = {};
let rooms = {};

const init = (() => {
    fs.readFile("./movies.json", (err, data) => {
        if(err)
        {
            console.log("Failed to read file " + err.path + " with error code: " + err.errno + " message: " + err.message);
            movies = null;
        }
        else movies = JSON.parse(data);
    });

    fs.readFile("./screenings.json", (err, data) => {
        if(err)
        {
            console.log("Failed to read file " + err.path + " with error code: " + err.errno + " message: " + err.message);
            screenings = null;
        }
        else screenings = JSON.parse(data);
    });

    fs.readFile("./rooms.json", (err, data) => {
        if(err)
        {
            console.log("Failed to read file " + err.path + " with error code: " + err.errno + " message: " + err.message);
            rooms = null;
        }
        else rooms = JSON.parse(data);
    })
})();

const isDataValid = () => {
    return (movies && screenings && rooms);
}

const app = express();
app.use(cors());
app.use(express.json());

  /****************************** */
 /**            GET             **/
/****************************** */

app.get("/", (req, res) => {
    if(isDataValid())
        res.status(200).send({movies: movies, screenings: screenings, rooms: rooms});
    else
        res.status(500).send("Failed to load data.");
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;

    if(movies)
    {
        if(id >= movies.length || id < 0)
            res.status(500).send("Invalid movie id.");
        else
            res.status(200).send(movies[id]);
    }
    else
        res.status(500).send("Failed to load data.");
});

app.get("/rooms/:id", (req, res) => {
    const { id } = req.params;

    if(rooms)
    {
        if(id >= rooms.length || id < 0)
            res.status(500).send("Invalid room id.");
        else
            res.status(200).send(rooms[id]);
    }
    else
        res.status(500).send("Failed to load data.");
});

app.get("/screenings/:id", (req, res) => {
    const { id } = req.params;

    if(screenings)
    {
        if(id >= screenings.length || id < 0)
            res.status(500).send("Invalid room id.");
        else
            res.status(200).send(screenings[id]);
    }
    else
        res.status(500).send("Failed to load data.");
});

  /****************************** */
 /**           POST             **/
/****************************** */

app.post("/add", (req, res) => {
    const {movie, screening, room} = req.body;
    screenings.push(screening);
    movies.push(movie);
    rooms.push(room);

    res.status(201).send();
});

app.post("/add/room", (req, res) => {
    const room = req.body;
    rooms.push(room);
    
    res.status(201).send();
});

app.post("/add/movie", (req, res) => {
    const movie = req.body;
    movies.push(movie);

    res.status(201).send();
});

app.post("/add/screening", (req, res) => {
    const screening = req.body;
    screenings.push(screening);

    res.status(201).send();
});

  /****************************** */
 /**           PUT              **/
/****************************** */

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const {movie, screening, room} = req.body;

    if(isDataValid())
    {
        assert(screenings.length === movies.length && movies.length === rooms.length, "Potential Vulnerability: Arrays are not equal in length.");

        if(id >= screenings.length || id < 0)
            res.status(500).send("Invalid index.");
        else
        {
            screenings[id] = screening;
            movies[id] = movie;
            rooms[id] = room;

            res.status(200).send(); // does not require non-empty response
        }
    }
    else
        res.status(500).send("Failed to access data.");

});

app.put("/update/screening/:id", (req, res) => {
    const { id } = req.params;
    const screening = req.body;

    if(screenings)
    {
        if(id >= screenings.length || id < 0)
            res.status(500).send("Invalid screening index.");
        else
        {
            screenings[id] = screening;
            res.status(200).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

app.put("/update/movie/:id", (req, res) => {
    const { id } = req.params;
    const movie = req.body;

    if(movies)
    {
        if(id >= movies.length || id < 0)
            res.status(500).send("Invalid movie index.");
        else
        {
            movies[id] = movie;
            res.status(200).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

app.put("/update/room/:id", (req, res) => {
    const { id } = req.params;
    const room = req.body;

    if(rooms)
    {
        if(id >= rooms.length || id < 0)
            res.status(500).send("Invalid room index.");
        else
        {
            rooms[id] = room;
            res.status(200).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

  /****************************** */
 /**          DELETE            **/
/****************************** */

app.delete("/delete/screenings/:id", (req, res) => {
    const { id } = req.params;

    if(screenings)
    {
        if(id >= screenings.length || id < 0)
            res.status(500).send("Invalid screening index.");
        else
        {
            screenings.splice(id, 1);
            res.status(204).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

app.delete("/delete/movies/:id", (req, res) => {
    const { id } = req.params;

    if(movies)
    {
        if(id >= movies.length || id < 0)
            res.status(500).send("Invalid movie index.");
        else
        {
            movies.splice(id, 1);
            res.status(204).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

app.delete("/delete/rooms/:id", (req, res) => {
    const { id } = req.params;

    if(rooms)
    {
        if(id >= rooms.length || id < 0)
            res.status(500).send("Invalid room index.");
        else
        {
            rooms.splice(id, 1);
            res.status(204).send();
        }
    }
    else
        res.status(500).send("Failed to access data.");
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));