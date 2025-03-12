import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Routes from './routes/routes';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };

  const handleClearItems = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Checkout', cartItems);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div>
      <NavBar totalItems={totalItems} totalPrice={totalPrice} />
      <Routes
        cartItems={cartItems}
        handleAddCart={handleAddCart}
        handleClearItems={handleClearItems}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;