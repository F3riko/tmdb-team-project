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
