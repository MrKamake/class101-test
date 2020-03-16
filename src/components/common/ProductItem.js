import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../common/Button';
import { TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import colors from '../../styles/colors';

const ProductItem = ({ product, onClick, cartList }) => {
  const { id, title, coverImage, price } = product;
  const isHave = cartList.some(({ product }) => product.id === id);

  return (
    <ProductItemWrapper>
      <ImageWrapper>
        <LazyLoadImage src={coverImage} effect="blur" alt={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Price>{price.toLocaleString()}원</Price>
      <StyledHoverButton>
        <Button onClick={() => onClick(product)} style={StyledHeartButton}>
          {isHave ? (
            <TiHeartFullOutline color={`${colors.pink}`} size="26px" />
          ) : (
            <TiHeartOutline color={`${colors.white}`} size="26px" />
          )}
        </Button>
      </StyledHoverButton>
    </ProductItemWrapper>
  );
};

ProductItem.defaultProps = {
  product: {
    id: 'EmptyData',
    title: 'Stranger',
    price: 100000
  },
  cartList: []
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    coverImage: PropTypes.string,
    price: PropTypes.number
  }),
  onClick: PropTypes.func,
  cartList: PropTypes.array
};

const ProductItemWrapper = styled.div`
  position: relative;
  margin: 2% 3%;
  width: 280px;
  height: 290px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  background-color: ${colors.lazyGray};
  height: 190px;
  img {
    display: block;
    width: 100%;
    height: 190px;
    border-radius: 3px;
  }
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
      transition: 0.3s;
    }
  }
`;

const Title = styled.title`
  display: -webkit-box;
  padding: 6px 0;
  height: 40px;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: ${colors.classBlack};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  position: absolute;
  bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.classBlack};
`;

const StyledHeartButton = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0',
  width: '26px',
  height: '26px'
};

const StyledHoverButton = styled.div`
  position: absolute;
  top: 1%;
  right: 2%;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  &:hover {
    background-color: ${colors.transparentWhite};
  }
`;

export default ProductItem;
