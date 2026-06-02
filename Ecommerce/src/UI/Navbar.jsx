import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = ({ onCartClick }) => {
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            to="/"
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            to="/store"
          >
            Store
          </NavLink>
        </li>
      </ul>
      <button className="navbar__cart" type="button" onClick={onCartClick}>
        Cart <span>{itemCount}</span>
      </button>
    </nav>
  );
};

export default Navbar;
