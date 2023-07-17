import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser, validateAccess } from "../../local-storage/fakeDB";

const AuthRequired = () => {
  const notValidated = <Navigate to="/" />;
  const user = getLoggedInUser();
  console.log(user);
  if (user) {
    let isLoggedIn = validateAccess(user.accessToken, user.id);
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      return notValidated;
    }
    return <Outlet />;
  } else {
    return notValidated;
  }
};

export default AuthRequired;
