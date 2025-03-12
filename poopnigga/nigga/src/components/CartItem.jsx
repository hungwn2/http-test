import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({
  image,
  title,
  description,
  price,
  count,
  itemId,
  handleAddCart,
  handleClearItems,
}) => {
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Quantity: {count}</p>
        <button onClick={() => handleAddCart(itemId)}>Add More</button>
        <button onClick={() => handleClearItems(itemId)}>Remove</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  handleClearItems: PropTypes.func.isRequired,
};

export default CartItem;