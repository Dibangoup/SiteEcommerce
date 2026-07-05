import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category.toUpperCase()}</span>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price.toFixed(2)} FCFA</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Ajouter au panier 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;