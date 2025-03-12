import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

const ProductDetail = ({
handleAddCart
}) => {
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const[loading, setLoading]=useState(true);
    const[error, setError]=useState(null);

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                const response=await fetch(`https://fakestoreapi.com/`);
                if (!response.ok){
                    throw new Error("failed to fetch product data");
                }
                const data=await response.json();
                setProduct(data);
                setLoading(false);
            }
            catch(error){
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error:{error}</p>;
    if (!product) return <p> Product not found</p>;

    return (
        <div className="product-detail">
        <img src={product.img} alt={product.title}/>
        
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <button onClick={()=>handleAddCart(product.id)}> Add to Cart</button>
        </div>
    );
};

ProductDetail.proptypes={
    handleAddCart:PropTypes.func.isRequired,
};
export default ProductDetail;