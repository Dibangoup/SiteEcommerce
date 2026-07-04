import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate(); // Permet de rediriger l'utilisateur par programmation
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
  });

  const [orderCompleted, setOrderCompleted] = useState(false);

  const shippingCost = cartTotal > 100 ? 0 : 9.99;
  const grandTotal = cartTotal + shippingCost;

  // Met à jour l'état local au fur et à mesure que l'utilisateur écrit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Déclenché à la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderCompleted(true);
    clearCart(); // On vide le panier une fois commandé !
  };

  if (orderCompleted) {
    return (
      <div className="checkout-success">
        <h2>Merci pour votre commande, {formData.name} ! 🎉</h2>
        <p>Votre paiement a été validé. (Simulation de paiement réussie !)</p>
        <button onClick={() => navigate('/')} className="btn-primary">Retour à la boutique</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Votre panier est vide. Impossible de commander.</h2>
        <button onClick={() => navigate('/')} className="btn-primary">Retour à la boutique</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Finaliser la Commande</h1>
      <div className="checkout-container">
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Informations de Livraison</h2>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Adresse e-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Adresse postale</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ville</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Code Postal</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
          </div>

          <h2>Paiement par Carte (Simulation)</h2>
          <div className="form-group">
            <label>Numéro de carte bancaire</label>
            <input 
              type="text" 
              name="cardNumber" 
              placeholder="XXXX XXXX XXXX XXXX" 
              value={formData.cardNumber} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="place-order-btn">Payer {grandTotal.toFixed(2)} €</button>
        </form>

        {/* Récapitulatif à droite */}
        <div className="checkout-summary">
          <h2>Résumé des articles</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.title} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)} €`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{grandTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;