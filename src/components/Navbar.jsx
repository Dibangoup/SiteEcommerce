import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Retour à l'accueil en cliquant sur le logo */}
        <Link to="/">ShopHere</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
      </ul>
      {/* Redirection vers le panier en cliquant sur l'icône */}
      <Link to="/cart" className="navbar-cart">
        <span>Panier 🛒</span>
        <span className="cart-count">{cartCount}</span>
      </Link>
    </nav>
  );
}

export default Navbar;