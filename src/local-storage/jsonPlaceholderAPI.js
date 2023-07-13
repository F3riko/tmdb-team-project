export const getTakenUsernamesAPI = async () => {
  const route = "https://jsonplaceholder.typicode.com/users";
  const usedUsernames = [];
  const response = await fetch(route);
  const data = await response.json();
  data.forEach((user) => {
    usedUsernames.push(user.username);
  });
  return usedUsernames;
};

