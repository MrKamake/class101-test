import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../utils';
import ProductItem from '../../components/ProductItem';
import PageNation from './PageNation';

const Products = () => {
  const [productItems, setProductItems] = useState([]);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    getDataApi('productItems').then(res => {
      res.sort((a, b) => b.score - a.score);
      setProductItems(res);
    });
  }, []);

  const handleChangePage = pageItems => {
    setPageItems(pageItems);
  };

  const renderProducts = () =>
    pageItems.map(product => <ProductItem key={product.id} {...product} />);

  if (productItems.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Products">
      {renderProducts()}
      <PageNation
        items={productItems}
        trimNumber={5}
        onChagePage={handleChangePage}
      />
    </div>
  );
};

export default Products;
