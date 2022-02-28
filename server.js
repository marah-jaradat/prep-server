`use strict`;

const express = require("express");
const app = express();
appp.use(express.json());
require("dotenv").config();
const axios = require("axios");
const APIKEY = process.env.APIKEY;

const jsonData = require("./moviesData/data.json");
const PORT = process.env.PORT || 3002;

app.get("/", homeHandler);
app.get("/favorite", favoriteHandler);

// // Constructor
// function Movie(title, poster_path, overview) {
//   this.title = title;
//   this.poster_path = poster_path;
//   this.overview = overview;
// }

function homeHandler(req, res) {
  //   return res.status(200).send("Hello World");

  let movies = [];
  axios
    .get(
      "https://api.themoviedb.org/3/movie/550?api_key=44bca49a3851cf70a7904aeed9847745"
    )
    .then((value) => {
      value.data.movies.forEach((movie) => {
        let oneMovie = new Movie(
          movie.data.title,
          movie.data.poster_path,
          movie.data.overview
        );
        movies.push(oneMovie);
      });
      // res.send("working");
      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function favoriteHandler(req, res) {
  //   return res.status(200).send("welcome to favorite");
  let favoriteQuery = req.query.favorite;

  let movies = [];

  axios
    .get(
      `https://api.themoviedb.org/3/movie/favorite/343611?api_key=${APIKEY}&append_to_response=videos`
    )
    .then((value) => {
      value.data.results.forEach((movie) => {
        movies.push(movie);
      });

      return res.status(200).json(movies);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

// function notFoundHandler(req, res) {
//   res.status(400).send("no end point");
// }

// function errorHandler(error, req, res) {
//   const err = {
//     status: 500,
//     message: error,
//   };
// }

// client.connect().then(() => {
app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
// });
