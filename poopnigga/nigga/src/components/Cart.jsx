import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const Cart = ({
  cartItems,
  handleAddCart,
  handleClearItems,
  handleCheckout,
}) => {
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          price={item.price}
          count={item.count}
          itemId={item.id}
          handleAddCart={handleAddCart}
          handleClearItems={handleClearItems}
        />
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleAddCart: PropTypes.func.isRequired,
  handleClearItems: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};

export default Cart;