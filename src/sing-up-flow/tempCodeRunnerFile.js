getLanguageData();
// // Make a request to the Azure Language API to fetch the language data
// fetch(endpoint)
//   .then((response) => response.json())
//   .then((data) => {
//     const languageOptions = Object.keys(data.translation).map((key) => ({
//       code: key,
//       name: data.translation[key].name,
//     }));
//     console.log(languageOptions);
//     // Use the languageOptions array to populate your autocompletion options
//   })
//   .catch((error) => {
//     console.error("Error fetching language data:", error);
//   });
