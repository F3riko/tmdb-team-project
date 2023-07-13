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
  const takenUsernames = await getTakenUsernamesAPI();
  localStorage.setItem("takenUsernames", takenUsernames);
};
