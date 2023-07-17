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

const Layout = ({query, setQuery, setSearchResults, selectedGenre, selectedLanguages}) => {
  return (
    <>
      <Link to='..' className="our-logo h1">PAL Movie Database</Link>
      <nav>
        <NavComponent 
        query={query}
        setQuery={setQuery}
        setSearchResults={setSearchResults}
        selectedGenre={selectedGenre}
        selectedLanguages={selectedLanguages}></NavComponent>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;