/* fetch function for getting movie data: ------------- */
/* Params for fetch: */
async function fetchFunction(url) {
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

    return data.results;
};

/* Export functions: */
export {
    fetchFunction
};