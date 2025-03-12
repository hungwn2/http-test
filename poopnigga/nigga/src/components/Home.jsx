import React from 'react';
import HomeItem from './HomeItem';

const Home = ({ handleAddCart }) => {
  const products = [
    
  ];

  return (
    <div className="home">
      {products.map((product) => (
        <HomeItem
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          itemId={product.id}
          handleAddCart={handleAddCart}
        />
      ))}
    </div>
  );
};

export default Home;