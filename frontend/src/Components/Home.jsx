import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Easy Basket</div>
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="nav-buttons">
          <button>About</button>
          <button>Your Bag</button>
          <button>Sign In</button>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="category-nav">
        {["Produce", "Meat & Seafood", "Dairy", "Bakery", "Frozen", "Grocery", "Wine & Spirits", "Tea, Coffee & Beverage"].map((category) => (
          <button key={category} className="category-button">{category}</button>
        ))}
      </nav>

      {/* Products Section */}
      <section className="products-section">
        <h2>Popular Products</h2>
        <div className="products-grid">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="product-card">
              <img src="https://via.placeholder.com/150" alt="Cabbage" className="product-image" />
              <p className="product-title">Cabbage</p>
              <p className="product-price">Rs 50/kg</p>
              <div className="product-actions">
                <button className="wishlist-button">❤️</button>
                <div className="quantity-controls">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;