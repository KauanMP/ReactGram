import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsHouseFill,
  BsCameraFill,
  BsFillPersonFill,
  BsHouseDoorFill,
  BsFillCameraFill,
} from "react-icons/bs";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./../../hooks/useAuth";
import { logout, reset } from "./../../slices/authSlice";
import { useState } from "react";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>

      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>

      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
