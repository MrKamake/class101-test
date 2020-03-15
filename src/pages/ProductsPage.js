import React from 'react';
import styled from 'styled-components';
import ProductsContainer from '../containers/ProductsContainer';

const ProductsPage = () => {
  return (
    <StyledProducts>
      <Title>인기 클래스</Title>
      <ProductsWrapper>
        <ProductsContainer />
      </ProductsWrapper>
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


export default ProductsPage;
