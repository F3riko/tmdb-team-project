import { getTakenUsernamesAPI } from "./jsonPlaceholderAPI";

export const saveUserInLS = (userObj) => {
  let users = localStorage.getItem("usersStorage");
  if (users) {
    users = JSON.parse(users);
    users.push(userObj);
  } else {
    users = [userObj];
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
  let takenUsernames = localStorage.getItem("takenUsername");
  if (!takenUsernames) {
    takenUsernames = await getTakenUsernamesAPI();
    localStorage.setItem("takenUsernames", JSON.stringify(takenUsernames));
  }
};

export const addTakenUsername = (username) => {
  const takenUsernames = JSON.parse(localStorage.getItem("takenUsernames"));
  takenUsernames.push(username);
  localStorage.setItem("takenUsernames", JSON.stringify(takenUsernames));
};

export const logInUser = (username, password) => {
  const users = getUsersFromLS();
  let loggedInUser = {};
  for (const user of users) {
    if (user.username === username && user.password === password) {
      loggedInUser = user;
      setLoggedInUser(loggedInUser);
      return loggedInUser.id;
    }
  }
  return false;
};

const setLoggedInUser = (loggedInUser) => {
  localStorage.setItem("loggedIn", JSON.stringify(loggedInUser));
};

export const getLoggedInUser = () => {
  const userLoggedIn = localStorage.getItem("loggedIn");
  if (userLoggedIn) {
    return JSON.parse(userLoggedIn);
  }
  return false;
};

export const validateAccess = (accessToken) => {
  let verified = false;
  if (accessToken) {
    const users = getUsersFromLS();
    for (let i = 0; i < users.length; i++) {
      if (accessToken === users[i].accessToken) {
        verified = true;
        break;
      }
    }
  }
  return verified;
};

export const updateUserInfo = (newUserInfo) => {
  const users = getUsersFromLS();
  const userIndex = users.indexOf(
    users.find((user) => (user.id = newUserInfo.id))
  );
  users[userIndex] = newUserInfo;
  localStorage.setItem("usersStorage", JSON.stringify(users));
  setLoggedInUser(newUserInfo);
};
