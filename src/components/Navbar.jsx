import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>ShopReact</h2>
      </div>
      <ul className="navbar-links">
        <li>Accueil</li>
        <li>Boutique</li>
      </ul>
      <div className="navbar-cart">
        <span>Panier 🛒</span>
        <span className="cart-count">{cartCount}</span>
      </div>
    </nav>
  );
}

export default Navbar;