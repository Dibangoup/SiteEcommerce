import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">Nos Meilleurs Produits</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;