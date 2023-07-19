import NavComponent from "./NavBar";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
  Link
} from "react-router-dom";

const Layout = ({query, setQuery, setSearchResults, selectedGenre, selectedLanguages, user, setUser}) => {
  return (
    <>
      <nav>
        <NavComponent 
        query={query}
        setQuery={setQuery}
        setSearchResults={setSearchResults}
        selectedGenre={selectedGenre}
        selectedLanguages={selectedLanguages}
        user={user}
        setUser={setUser}></NavComponent>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;