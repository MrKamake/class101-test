import React, { useState, useEffect } from 'react';
import { getDataApi } from '../../api';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import PageNation from '../../components/PageNation';

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

  if (productItems.length === 0) return <Loading />;

  return (
    <StyledCart>
      <Title>인기 클래스</Title>
      <StyledProducts>
        {renderProducts()}
        <PageNation
          items={productItems}
          trimNumber={5}
          onChagePage={handleChangePage}
        />
      </StyledProducts>
    </StyledCart>
  );
};

const StyledCart = styled.div`
  margin: 0 auto;
  width: 62%;
`;

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const Title = styled.h2`
  display: block;
  font-weight: bold;
`;

export default Products;
