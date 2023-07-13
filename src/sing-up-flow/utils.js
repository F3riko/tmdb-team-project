export async function getLanguageData() {
  const endpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const languageOptions = Object.keys(data.translation).map(
      (key) => data.translation[key].name
    );

    return languageOptions;
  } catch (error) {
    console.log(`Error in fetching languages: ${error}`);
  }
}

// Create API fetch func for this one
export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];
