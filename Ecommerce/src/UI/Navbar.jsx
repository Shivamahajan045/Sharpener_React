import "./Navbar.css";
import { useCart } from "../context/CartContext";

const Navbar = ({ activeSection, onCartClick, onSectionChange }) => {
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li>
          <button
            className={`navbar__link ${activeSection === "home" ? "navbar__link--active" : ""}`}
            type="button"
            onClick={() => onSectionChange("home")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`navbar__link ${activeSection === "about" ? "navbar__link--active" : ""}`}
            type="button"
            onClick={() => onSectionChange("about")}
          >
            About
          </button>
        </li>
        <li>
          <button
            className={`navbar__link ${activeSection === "store" ? "navbar__link--active" : ""}`}
            type="button"
            onClick={() => onSectionChange("store")}
          >
            Store
          </button>
        </li>
      </ul>
      <button className="navbar__cart" type="button" onClick={onCartClick}>
        Cart <span>{itemCount}</span>
      </button>
    </nav>
  );
};

export default Navbar;
