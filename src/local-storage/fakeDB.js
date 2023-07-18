import { getTakenUsernamesAPI } from "./jsonPlaceholderAPI";

export const saveUserInLS = (userObj) => {
  let users = getUsersFromLS();
  if (users) {
    users = { ...users, [userObj.id]: userObj };
  } else {
    users = { [userObj.id]: userObj };
  }
  localStorage.setItem("usersStorage", JSON.stringify(users));
};

export const getUsersFromLS = () => {
  const users = localStorage.getItem("usersStorage");
  if (!users) {
    return null;
  } else {
    return JSON.parse(users);
  }
};

export const saveTakenUsernamesInLS = async () => {
  let takenUsernames = localStorage.getItem("takenUsernames");
  if (!takenUsernames) {
    takenUsernames = await getTakenUsernamesAPI();
    localStorage.setItem("takenUsernames", JSON.stringify(takenUsernames));
  }
};

export const addTakenUsername = (username) => {
  let takenUsernames = localStorage.getItem("takenUsernames");
  if (takenUsernames) {
    takenUsernames = JSON.parse(takenUsernames);
  } else {
    takenUsernames = [];
  }
  takenUsernames.push(username.toLowerCase());
  localStorage.setItem("takenUsernames", JSON.stringify(takenUsernames));
};

export const logInUser = (username, password) => {
  const users = getUsersFromLS();
  let loggedInUser = null;
  for (const user of Object.values(users)) {
    if (user.username === username && user.password === password) {
      loggedInUser = user;
      setLoggedInUser(loggedInUser);
      return loggedInUser.id;
    }
  }
  return false;
};

export const logOutUser = () => {
  const currentUser = getLoggedInUser();
  if (currentUser) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("viewedMoviesData");
  }
};

const setLoggedInUser = (loggedInUser) => {
  localStorage.setItem("loggedIn", JSON.stringify(loggedInUser));
};

export const getLoggedInUser = () => {
  const userLoggedIn = localStorage.getItem("loggedIn");
  if (userLoggedIn) {
    const parsedUser = JSON.parse(userLoggedIn);
    return parsedUser;
  }
  return false;
};

export const validateAccess = (accessToken, userId) => {
  if (accessToken) {
    const users = getUsersFromLS();
    if (users && users[userId] && accessToken === users[userId].accessToken) {
      return true;
    }
  }
  return false;
};

export const updateUserInfo = (newUserInfo) => {
  const users = getUsersFromLS();
  const updatedUsers = { ...users, [newUserInfo.id]: newUserInfo };
  localStorage.setItem("usersStorage", JSON.stringify(updatedUsers));
  setLoggedInUser(newUserInfo);
};

export const getTakenUsernames = () => {
  const takenUsernames = localStorage.getItem("takenUsernames");
  if (takenUsernames) {
    return JSON.parse(takenUsernames);
  }
  return false;
};

export const saveMovieInHistory = (movieId) => {
  const currentUser = getLoggedInUser();
  if (currentUser && movieId && !currentUser.viewHistory.includes(movieId)) {
    currentUser.viewHistory.push(movieId);
    updateUserInfo(currentUser);
    localStorage.removeItem("viewedMoviesData");
  }
};

export const getViewMoviesData = () => {
  const movies = localStorage.getItem("viewedMoviesData");
  if (movies) {
    return JSON.parse(movies);
  }
  return false;
};

export const setViewMoviesData = (moviesData) => {
  if (moviesData) {
    localStorage.setItem("viewedMoviesData", JSON.stringify(moviesData));
  }
  return false;
};

export const deleteViewHistory = () => {
  const user = getLoggedInUser();
  if (user) {
    user.viewHistory = [];
    updateUserInfo(user);
    localStorage.removeItem("viewedMoviesData");
  }
  return false;
};
