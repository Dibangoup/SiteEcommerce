import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <h1 className="page-title">Nos Meilleurs Produits</h1>
        
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;