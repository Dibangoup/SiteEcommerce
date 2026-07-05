import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const shippingCost = cartTotal > 25000 || cartTotal === 0 ? 0 : 1000;
  const grandTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Votre panier est vide 🛒</h2>
        <p>Découvrez nos produits et ajoutez-en à votre panier !</p>
        <Link to="/" className="btn-primary">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Mon Panier</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <span className="cart-item-category">{item.category}</span>
                <span className="cart-item-price">{item.price.toFixed(0)} FCFA</span>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                {(item.price * item.quantity).toFixed(0)} FCFA
              </div>
              <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                🗑️
              </button>
            </div>
          ))}
          <button className="clear-cart-btn" onClick={clearCart}>Vider le panier</button>
        </div>

        <div className="cart-summary">
          <h2>Résumé de la commande</h2>
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{cartTotal.toFixed(0)} FCFA</span>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(0)} FCFA`}</span>
          </div>
          {shippingCost > 0 && (
            <p className="shipping-info">Livraison gratuite dès 25000 FCFA d'achats !</p>
          )}
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>{grandTotal.toFixed(0)} FCFA</span>
          </div>
          <Link to="/checkout" className="checkout-btn">Passer au paiement</Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;