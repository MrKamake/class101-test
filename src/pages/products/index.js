import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../utils';
import ProductItem from '../../components/ProductItem';
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
  padding: 8% 15% 0 15%;
  .products-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 87.5%;
  }
`;

export default Products;
