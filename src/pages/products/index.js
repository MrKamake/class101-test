import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../utils';
import ProductItem from '../../components/ProductItem';

const Products = () => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    getDataApi('productItems').then(res => {
      res.sort((a, b) => b.score - a.score);
      setProductItems(res);
    });
  }, []);

  const renderProducts = () =>
    productItems.map(product => <ProductItem key={product.id} {...product} />);

  return (
    <div className="Products">
      {productItems.length === 0 ? <h1>Loading...</h1> : renderProducts()}
    </div>
  );
};

export default Products;
