import { saveTakenUsernamesInLS } from "../local-storage/fakeDB";

const takenUsernames = JSON.parse(localStorage.getItem("takenUsernames"));
// Await this one
(async () => {
  await saveTakenUsernamesInLS();
})();

const isAlphanumeric = (inputString) => {
  if (!/^[a-zA-Z0-9]+$/.test(inputString)) {
    return "Should contain only letters and digits";
  }
  return false;
};

const isLengthAppropriate = (value, min, max) => {
  if (value.length < min || value.length > max) {
    return `Should be between ${min} and ${max} characters`;
  }
  return false;
};

const isAlphanumericAndAllowedChars = (inputString) => {
  if (!/^[a-zA-Z0-9_\-!*]+$/.test(inputString)) {
    return "Should contain only letters, digits and _, -, ! or *";
  }
  return false;
};

export const arePasswordsSame = (password, repeatPassword) => {
  console.log(password, repeatPassword);
  if (password !== repeatPassword) {
    return "Password shuld be the same!";
  }
  return false;
};

const isIncludedInArray = (value, array) => {
  if (!array.includes(value) && value) {
    return "You should choose from the list or leave the field empty";
  }
  return false;
};

const isUsernameTaken = (value) => {
  if (takenUsernames.includes(value)) {
    return "This username is already taken";
  }
  return false;
};

async function getLanguageData() {
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

export const languages = await getLanguageData();

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

export const defaultFormData = {
  username: {
    name: "username",
    value: "",
    validations: [
      (value) => isAlphanumeric(value),
      (value) => isLengthAppropriate(value, 3, 10),
      (value) => isUsernameTaken(value),
    ],
    errors: [],
  },
  password: {
    name: "password",
    value: "",
    validations: [
      (value) => isAlphanumericAndAllowedChars(value),
      (value) => isLengthAppropriate(value, 5, 10),
    ],
    errors: [],
  },
  passwordRepeat: {
    name: "passwordRepeat",
    value: "",
    validations: [
      (value) => isAlphanumericAndAllowedChars(value),
      (value) => isLengthAppropriate(value, 5, 10),
    ],
    errors: [],
  },
  language: {
    name: "language",
    value: "",
    validations: [(value) => isIncludedInArray(value, languages)],
    errors: [],
  },
  genre: {
    name: "genre",
    value: "",
    validations: [(value) => isIncludedInArray(value, genres)],
    errors: [],
  },
  homepage: {
    name: "homepage",
    value: "",
    validations: [],
    errors: [],
  },
  voice: {
    name: "homepage",
    value: "",
    validations: [],
    errors: [],
  },
};

export const validateInput = (name, formData) => {
  const value = formData[name].value;
  const errors = [];
  if (formData[name].validations) {
    formData[name].validations.forEach((validation) => {
      const error = validation(value);
      if (error) {
        errors.push(error);
      }
    });
  }

  return errors;
};
