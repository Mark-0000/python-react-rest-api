// import Footer from "./cmp/Footer";
import Navbar from "./cmp/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CharacterDetails from "./cmp/CharacterDetails";
import CharacterList from "./cmp/CharacterList";
import CreateCharacter from "./cmp/CreateCharacter";
import SearchDetails from "./cmp/SearchDetails";
import NotFound from "./cmp/NotFound";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CharacterList />
          </Route>

          <Route path="/character/:id">
            <CharacterDetails />
          </Route>

          <Route path="/search/:searchName">
            <SearchDetails />
          </Route>

          <Route path="/create">
            <CreateCharacter />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
