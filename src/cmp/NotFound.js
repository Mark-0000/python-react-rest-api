import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="page-not-found-container text-center">
      <h1 className="page-not-found-title">404</h1>
      <h1 className="page-not-found-subtitle">PAGE NOT FOUND</h1>
      <Link to="/" className="page-not-found-link">Go to home...</Link>
    </div>
  );
};

export default NotFound;
