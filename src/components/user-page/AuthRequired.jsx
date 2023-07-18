import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser, validateAccess } from "../../local-storage/fakeDB";

const AuthRequired = () => {
  const notValidated = <Navigate to="/" />;
  const user = getLoggedInUser();
  if (user) {
    let isLoggedIn = validateAccess(user.accessToken, user.id);
    if (!isLoggedIn) {
      return notValidated;
    }
    return <Outlet />;
  } else {
    return notValidated;
  }
};

export default AuthRequired;
