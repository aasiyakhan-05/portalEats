import React, { useState } from 'react';
import '../styles/menupage.css';

function MenuPage({ onAddToCart, setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems = [
    // RICE
    { id: 1, name: 'Roman Rice', price: 20, category: 'rice', description: 'Aromatic rice with vegetables', image: 'https://images.unsplash.com/photo-1596040424844-dac51dacbfff?w=400&h=300&fit=crop&q=80' },
    { id: 2, name: 'White Rice Saffron', price: 15, category: 'rice', description: 'Fragrant saffron rice', image: 'https://images.unsplash.com/photo-1623428908241-051c11f19be5?w=400&h=300&fit=crop&q=80' },
    { id: 3, name: 'Mix Rice', price: 38, category: 'rice', description: 'Mixed with herbs and spices', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561431?w=400&h=300&fit=crop&q=80' },
    { id: 4, name: 'Green Rice with Dill', price: 22, category: 'rice', description: 'Fresh green rice', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=400&h=300&fit=crop&q=80' },
    { id: 5, name: 'Mexican Rice', price: 20, category: 'rice', description: 'Spicy Mexican style rice', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },

    // KABABS
    { id: 6, name: 'Kabab Koobideh', price: 35, category: 'kababs', description: 'Seasoned ground meat kabab', image: 'https://images.unsplash.com/photo-1599487488073-3f1b6efb63d5?w=400&h=300&fit=crop&q=80' },
    { id: 7, name: 'Meat Tikka Yogurt', price: 42, category: 'kababs', description: 'Tender meat in yogurt marinade', image: 'https://images.unsplash.com/photo-1612874742237-415c69f1f41f?w=400&h=300&fit=crop&q=80' },
    { id: 8, name: 'Meat Tikka Lemon', price: 42, category: 'kababs', description: 'Tangy lemon marinated meat', image: 'https://images.unsplash.com/photo-1612874742237-415c69f1f41f?w=400&h=300&fit=crop&q=80' },
    { id: 9, name: 'Chicken Tikka Yogurt', price: 40, category: 'kababs', description: 'Marinated chicken pieces', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&q=80' },
    { id: 10, name: 'Sheesh Tawouk', price: 38, category: 'kababs', description: 'Grilled chicken skewers', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561431?w=400&h=300&fit=crop&q=80' },
    { id: 11, name: 'Chicken Kabab', price: 36, category: 'kababs', description: 'Ground chicken kabab', image: 'https://images.unsplash.com/photo-1599487488073-3f1b6efb63d5?w=400&h=300&fit=crop&q=80' },
    { id: 12, name: 'Royal Kabab', price: 48, category: 'kababs', description: 'Premium mixed meat kabab', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561431?w=400&h=300&fit=crop&q=80' },
    { id: 13, name: 'Tabrizi Kabab', price: 45, category: 'kababs', description: 'Special Tabrizi style kabab', image: 'https://images.unsplash.com/photo-1612874742237-415c69f1f41f?w=400&h=300&fit=crop&q=80' },

    // SANDWICHES
    { id: 14, name: 'Meat Tikka Sandwich', price: 16, category: 'sandwiches', description: 'Meat tikka in bread', image: 'https://images.unsplash.com/photo-1585238341710-4b4d60cb2133?w=400&h=300&fit=crop&q=80' },
    { id: 15, name: 'Meat Kabab Sandwich', price: 17, category: 'sandwiches', description: 'Meat kabab in bread', image: 'https://images.unsplash.com/photo-1511690656519-c1426dad45bf?w=400&h=300&fit=crop&q=80' },
    { id: 16, name: 'Chicken Kabab Sandwich', price: 15, category: 'sandwiches', description: 'Chicken kabab in bread', image: 'https://images.unsplash.com/photo-1585238341710-4b4d60cb2133?w=400&h=300&fit=crop&q=80' },
    { id: 17, name: 'Chicken Tikka Sandwich', price: 15, category: 'sandwiches', description: 'Chicken tikka in bread', image: 'https://images.unsplash.com/photo-1511690656519-c1426dad45bf?w=400&h=300&fit=crop&q=80' },
    { id: 18, name: 'Sheesh Tawouk Sandwich', price: 15, category: 'sandwiches', description: 'Grilled chicken in bread', image: 'https://images.unsplash.com/photo-1585238341710-4b4d60cb2133?w=400&h=300&fit=crop&q=80' },
    { id: 19, name: 'French Fries', price: 15, category: 'sandwiches', description: 'Crispy golden fries', image: 'https://images.unsplash.com/photo-1365299848228-36147e56b2dd?w=400&h=300&fit=crop&q=80' },
    { id: 20, name: 'Wedges', price: 20, category: 'sandwiches', description: 'Seasoned potato wedges', image: 'https://images.unsplash.com/photo-1583738820694-c7c8fdf87e1b?w=400&h=300&fit=crop&q=80' },

    // SALADS
    { id: 21, name: 'Homos', price: 18, category: 'salads', description: 'Chickpea dip', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80' },
    { id: 22, name: 'Muttabal', price: 18, category: 'salads', description: 'Eggplant dip', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80' },
    { id: 23, name: 'Yogurt', price: 5, category: 'salads', description: 'Plain yogurt', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=400&h=300&fit=crop&q=80' },
    { id: 24, name: 'Fattoush Salad', price: 18, category: 'salads', description: 'Mixed salad with crispy bread', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80' },
    { id: 25, name: 'Shirazi Salad', price: 18, category: 'salads', description: 'Fresh Persian salad', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&q=80' },
    { id: 26, name: 'Rocca Salad', price: 18, category: 'salads', description: 'Arugula salad', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&q=80' },

    // PLATES
    { id: 27, name: 'Full Chicken Grilled', price: 52, category: 'plates', description: 'Whole grilled chicken', image: 'https://images.unsplash.com/photo-1598908557017-dac18b2eaf5c?w=400&h=300&fit=crop&q=80' },
    { id: 28, name: 'Half Grilled Chicken', price: 28, category: 'plates', description: 'Half grilled chicken', image: 'https://images.unsplash.com/photo-1598908557017-dac18b2eaf5c?w=400&h=300&fit=crop&q=80' },
    { id: 29, name: 'Chicken with Bone Bread', price: 42, category: 'plates', description: 'Grilled chicken with bread', image: 'https://images.unsplash.com/photo-1598908557017-dac18b2eaf5c?w=400&h=300&fit=crop&q=80' },
    { id: 30, name: 'Arayes Roll', price: 35, category: 'plates', description: 'Meat stuffed bread roll', image: 'https://images.unsplash.com/photo-1599487488073-3f1b6efb63d5?w=400&h=300&fit=crop&q=80' },
    { id: 31, name: 'Arabic Arayes', price: 25, category: 'plates', description: 'Traditional arayes', image: 'https://images.unsplash.com/photo-1585238341710-4b4d60cb2133?w=400&h=300&fit=crop&q=80' },
    { id: 32, name: 'Spicy Chicken Tikka', price: 42, category: 'plates', description: 'Spiced chicken tikka plate', image: 'https://images.unsplash.com/photo-1612874742237-415c69f1f41f?w=400&h=300&fit=crop&q=80' },

    // SALONA (STEWS)
    { id: 33, name: 'Okra with Meat Rice', price: 35, category: 'salona', description: 'Traditional okra stew', image: 'https://images.unsplash.com/photo-1596040424844-dac51dacbfff?w=400&h=300&fit=crop&q=80' },
    { id: 34, name: 'Haroumi Ghetya with Rice', price: 35, category: 'salona', description: 'Eggplant meat stew', image: 'https://images.unsplash.com/photo-1596040424844-dac51dacbfff?w=400&h=300&fit=crop&q=80' },
    { id: 35, name: 'Ash Reshta', price: 15, category: 'salona', description: 'Herb noodle soup', image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=400&h=300&fit=crop&q=80' },
    { id: 36, name: 'Ghormei Sabzi with Rice', price: 35, category: 'salona', description: 'Herb kidney bean stew', image: 'https://images.unsplash.com/photo-1596040424844-dac51dacbfff?w=400&h=300&fit=crop&q=80' },
    { id: 37, name: 'Barberry Pilaf Chicken', price: 35, category: 'salona', description: 'Saffron barberry pilaf', image: 'https://images.unsplash.com/photo-1596040424844-dac51dacbfff?w=400&h=300&fit=crop&q=80' },

    // SEAFOOD
    { id: 38, name: 'Grilled Shrimps', price: 50, category: 'seafood', description: 'Grilled shrimps with rice', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80' },
    { id: 39, name: 'Grilled Supreme Fish', price: 48, category: 'seafood', description: 'Premium grilled fish', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80' },
    { id: 40, name: 'Grilled King Fish', price: 45, category: 'seafood', description: 'King fish grilled', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80' },

    // DRINKS
    { id: 41, name: 'Pepsi', price: 3, category: 'drinks', description: 'Cold pepsi', image: 'https://images.unsplash.com/photo-1554866585-c599818abb7d?w=400&h=300&fit=crop&q=80' },
    { id: 42, name: 'Seven Up', price: 3, category: 'drinks', description: 'Cold seven up', image: 'https://images.unsplash.com/photo-1554866585-c599818abb7d?w=400&h=300&fit=crop&q=80' },
    { id: 43, name: 'Dew', price: 3, category: 'drinks', description: 'Mountain dew', image: 'https://images.unsplash.com/photo-1554866585-c599818abb7d?w=400&h=300&fit=crop&q=80' },
    { id: 44, name: 'Miranda', price: 3, category: 'drinks', description: 'Cold miranda', image: 'https://images.unsplash.com/photo-1554866585-c599818abb7d?w=400&h=300&fit=crop&q=80' },
    { id: 45, name: 'Mineral Water', price: 1, category: 'drinks', description: 'Pure mineral water', image: 'https://images.unsplash.com/photo-1608270861620-7476ffd00d4d?w=400&h=300&fit=crop&q=80' },
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'kababs', name: 'Kababs' },
    { id: 'rice', name: 'Rice Dishes' },
    { id: 'plates', name: 'Plates' },
    { id: 'sandwiches', name: 'Sandwiches' },
    { id: 'salads', name: 'Salads' },
    { id: 'salona', name: 'Stews' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'drinks', name: 'Drinks' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Menu</h1>

      <div className="menu-search">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="menu-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-content">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-footer">
                <span className="item-price">{item.price} AED</span>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No items found. Try a different search!</p>
        </div>
      )}
    </div>
  );
}

export default MenuPage;