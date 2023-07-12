import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import "./App.css";

// The following components are placeholder for testing and demo purposes,
// when the specified components are ready the placeholder should have been replaced
// wian an actual ones

const Layout = () => {
  return (
    <>
      <nav>
        <h1>Navigation component placeholder</h1>
      </nav>
      <Outlet />
    </>
  );
};

const MainPage = () => {
  return <h1>Main page</h1>;
};

const MoviePage = () => {
  const { id } = useParams();
  return <h1>Movie with id {id}</h1>;
};

const AuthRequired = () => {
  // AuthFunc(id) goes in this layout component
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const UserPage = () => {
  const { id } = useParams();

  return <h1>This page is protected by the Auth func. The user id is {id}</h1>;
};

const SearchResults = () => {
  // useSearchParams hook goes here
  return <h1>Search Results</h1>;
};

// End of testing section

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route element={<AuthRequired />}>
            <Route path="user/:id" element={<UserPage />} />
          </Route>
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="*" element={<h1>404 - Page not found goes here</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
