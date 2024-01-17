import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  const me = { ...user };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary md-4">
      <div className="container-fluid">
        <a className="navbar-brand h1 ms-4 mt-1" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/favorites">
              Favorites
            </NavLink>
            <NavLink className="nav-link" to="/trending">
              Trendings
            </NavLink>
            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link" to="/signUp">
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <Link className="nav-link" to="/profile">
                  {me.username}
                </Link>

                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
