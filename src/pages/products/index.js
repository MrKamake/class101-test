import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../api';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import PageNation from '../../components/PageNation';
import { TRIM_NUMBER, NUMBER_OF_ITEMS } from '../../constants';

const Products = () => {
  const [productItems, setProductItems] = useState([]);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    getDataApi('productItems').then(res => {
      res.sort((a, b) => b.score - a.score);
      setProductItems(res);
      setPageItems(res.slice(0, TRIM_NUMBER));
    });
  }, []);

  const handleChangePage = page => {
    const startSliceNumber = 5 * (page - 1);
    setPageItems(
      productItems.slice(startSliceNumber, startSliceNumber + NUMBER_OF_ITEMS)
    );
  };

  const renderProducts = () =>
    pageItems.map(product => <ProductItem key={product.id} {...product} />);

  if (productItems.length === 0) return <Loading />;

  return (
    <StyledProducts>
      <Title>인기 클래스</Title>
      <ProductsWrapper>{renderProducts()}</ProductsWrapper>
      <PageNation
        numberOfItems={productItems.length}
        onChagePage={handleChangePage}
      />
    </StyledProducts>
  );
};

const StyledProducts = styled.div`
  margin: 0 auto;
  width: 62%;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 4% 0;
  font-weight: bold;
`;

export default Products;
