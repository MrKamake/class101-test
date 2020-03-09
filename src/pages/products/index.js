import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../utils';

const Products = () => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    getDataApi('productItems').then(res => {
      setProductItems(res);
    });
  }, []);

  return <div className="Products">Products Page</div>;
};

export default Products;
