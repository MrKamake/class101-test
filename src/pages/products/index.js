import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../utils';
import ProductItem from './ProductItem';
import PageNation from './PageNation';
import styled from 'styled-components';

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
    <StyledProducts>
      {renderProducts()}
      <PageNation
        items={productItems}
        trimNumber={5}
        onChagePage={handleChangePage}
      />
    </StyledProducts>
  );
};

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding-top: 5%;
  width: 88%;
`;

export default Products;
