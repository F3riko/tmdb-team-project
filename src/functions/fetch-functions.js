/* fetch function for getting movie data: ------------- */
/* Params for fetch: */
async function fetchFunction(url, singleMovie = false, fetchImages = false ) {
    const tokenAddress = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2E3ZTdmNmFlODg1NzVjMDY5YzJiZjVhN2IxZjZjMCIsInN1YiI6IjY0OWIxODgwMjk3NWNhMDBjODgzMDQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pVyp5VbRWguA2sJL3w0Khz_oN9HTmiKmAoUe-8H0Fu0';

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${tokenAddress}`
        }
    };
    const response = await fetch(url, options)
    const data = await response.json();

    //Not sure what these are, but they sure are clogging up the console
    // console.log(data.results)
    // console.log(data.backdrops)

    if (fetchImages) {
        return data.backdrops || data.results
    }

    return singleMovie ? data : data.results;
};

/* Handle loading  */
function loadingState(loadingstate){
    if (loadingstate) { /* check for a boolean value, if its true, the data is not fetched yet */
        return <div> Please wait... </div>
    }
};

/* Handle search: */
 async function handleSearch(query, setSearchResults, selectedGenre, selectedLanguages, selectedYear) {
    let url = getUrl(query, selectedGenre, selectedLanguages, selectedYear); /* gets the query from the state, makes the fetch url based on it */
    const searchResults = await fetchFunction(url); /* fetch data, with the queried url  */
    setSearchResults(searchResults); /* save it to search results state */
 };

/* Get url */
function getUrl(query, selectedGenre, selectedLanguages, selectedYear, id, fetchImages = false){
    const baseUrl = `https://api.themoviedb.org/3/`;

    let finalEndPoint = '';
    let additionalParameters = ''

    if(!fetchImages && id){
        let singleMovieUrl = `https://api.themoviedb.org/3/movie/${id}`
        return singleMovieUrl;
    };

    if (fetchImages && id){
        let movieImagesUrl = `https://api.themoviedb.org/3/movie/${id}/images`
        console.log(movieImagesUrl)
        return movieImagesUrl;
    }

    if (query){
        finalEndPoint = `search/movie?query=${encodeURIComponent(query)}`;
    } else {
        finalEndPoint = `discover/movie?`;
    };

    if (selectedYear){
        additionalParameters += `&primary_release_year=${selectedYear}`;
    };

    if (selectedGenre && selectedGenre.length > 0) {
        additionalParameters += `&with_genres=${selectedGenre.join(',')}`
    };

    if (selectedLanguages) {
        additionalParameters += `&with_original_language=${selectedLanguages}`
    };

    const url = `${baseUrl}${finalEndPoint}${additionalParameters}`;

    return url; 
}


/* Export functions: */
export {
    fetchFunction, 
    getUrl, 
    loadingState, 
    handleSearch, 
};