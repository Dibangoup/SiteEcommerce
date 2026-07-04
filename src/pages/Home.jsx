import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Home() {
  // États locaux (States) pour contrôler les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // 1. Logique de FILTRAGE (Recherche + Catégorie)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Logique de TRI (Prix)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price; // Tri croissant
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price; // Tri décroissant
    }
    return 0; // Tri par défaut (ordre original)
  });

  return (
    <div className="home-container">
      <h1 className="page-title">Nos Meilleurs Produits</h1>

      {/* Barre de filtres */}
      <div className="filter-bar">
        {/* Recherche textuelle */}
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* Sélection par Catégorie */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">Toutes les catégories</option>
          <option value="accessoires">Accessoires</option>
          <option value="vetements">Vêtements</option>
          <option value="electronique">Électronique</option>
          <option value="chaussures">Chaussures</option>
        </select>

        {/* Sélection du Tri */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Tri par défaut</option>
          <option value="price-asc">Prix : croissant ↗</option>
          <option value="price-desc">Prix : décroissant ↘</option>
        </select>
      </div>

      {/* Affichage des produits ou d'un message d'absence de résultat */}
      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>Aucun produit ne correspond à vos critères de recherche. 🔍</p>
        </div>
      )}
    </div>
  );
}

export default Home;