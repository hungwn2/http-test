import React from 'react';
import PropTypes from 'prop-types';

const HomeItem = ({ image, title, price, itemId, handleAddCart }) => {
  const product = { id: itemId, image, title, price };

  return (
    <div className="home-item">
      <img src={image} alt={title} className="home-item-image" />
      <div className="home-item-details">
        <h3>{title}</h3>
        <p>Price: ${price.toFixed(2)}</p>
        <button onClick={() => handleAddCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

HomeItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  handleAddCart: PropTypes.func.isRequired,
};

export default HomeItem;