import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const searchHandler = (e) => {
    let searchInput = e.target.value;
    e.preventDefault();
    if (searchInput.length === 0) {
      // history.go(-1)
      history.push('/')
    } else {
      history.push(`/search/${searchInput}`);
    }
  };
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Overlord
          </Link>
          <form className="d-flex">
            <input
              onChange={searchHandler}
              className="search-input me-3"
              placeholder="Search name"
            />
            <Link className="btn btn-add" to="/create">
              <i className="fas fa-plus-circle"></i>Add
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
