import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { deleteViewHistory } from "../../local-storage/fakeDB";

const FilterViewHistoryBar = ({
  moviesToFilter,
  setMoviesAfterFilter,
  unsortedMovies,
}) => {
  const genres = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
    { name: "TV Movie", id: 10770 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
  ];

  const [selectedGenre, setSelectedGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [year, setYear] = useState("");

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = () => {
    setSelectedGenre("");
    setRating(0);
    setYear("");
    setMoviesAfterFilter(unsortedMovies);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const deleteAllHistory = () => {
    deleteViewHistory();
  };

  const filterMovies = () => {
    setMoviesAfterFilter([false]);
    const filteredMovies = unsortedMovies.filter((movie) => {
      let matchGenre = true;
      let matchRating = true;
      let matchYear = true;

      if (selectedGenre !== "") {
        const genres_ids = [];
        for (const genreSingle of movie.genres) {
          genres_ids.push(genreSingle.id);
        }
        matchGenre = genres_ids.includes(parseInt(selectedGenre));
      }

      if (rating > 0) {
        matchRating = movie.vote_average >= rating;
      }

      if (year !== "") {
        matchYear = movie.release_date && movie.release_date.startsWith(year);
      }

      return matchGenre && matchRating && matchYear;
    });

    if (filteredMovies.length === 0) {
      return;
    }

    setMoviesAfterFilter(filteredMovies);
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row p-4 align-items-center">
        <div className="col">
          <div className="form-group text-center">
            <label htmlFor="genre">Genre</label>
            <select
              className="form-control"
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={nanoid()} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group text-center d-flex flex-column align-items-center">
            <label htmlFor="rating" style={{ marginBottom: "10px" }}>
              Rating: {rating}
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={rating}
              onChange={handleRatingChange}
              className="form-control-range d-block"
              id="rating"
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group text-center">
            <label htmlFor="releaseYear">Release Year</label>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              className="form-control"
              id="releaseYear"
              min={1900}
              max={2030}
            />
          </div>
        </div>
        <div className="col mt-4">
          <div className="form-group text-center d-flex justify-content-around align-items-end">
            <button className="btn btn-primary" onClick={filterMovies}>
              Apply
            </button>
            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-danger" onClick={deleteAllHistory}>
              Delete all history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterViewHistoryBar;
