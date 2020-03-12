import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../App';
import styled from 'styled-components';
import Button from '../../components/Button';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = product => {
  const { id, title, coverImage, price } = product;
  const { cartList, setCartList } = useContext(CartContext);

  const toggleItem = id => {
    const callback = ({ product }) => product.id !== id;
    cartList.every(callback)
      ? cartList.length < 3
        ? setCartList([
            ...cartList,
            {
              product,
              selected: true,
              quantity: 1,
              coupon: { type: '', discount: 0 }
            }
          ])
        : alert('장바구니에는 3개까지 담을 수 있어요. :)')
      : setCartList(cartList.filter(callback));
  };

  const isHave = cartList.some(({ product }) => product.id === id);

  return (
    <ProductItemWrapper>
      <ImageWrapper>
        <LazyLoadImage src={coverImage} effect="blur" alt={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Price>{price.toLocaleString()}원</Price>
      <StyledHoverButton>
        <Button onClick={toggleItem.bind(this, id)} style={StyledHeartButton}>
          {isHave ? (
            <FaHeart color="#FC3C46" size="21px" />
          ) : (
            <FaRegHeart color="#FFFFFF" size="21px" />
          )}
        </Button>
      </StyledHoverButton>
    </ProductItemWrapper>
  );
};

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    coverImage: PropTypes.string,
    price: PropTypes.number
  })
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
  span {
    img {
      display: block;
      width: 100%;
      height: 190px;
      border-radius: 3px;
      transition: 0.3s;
    }
        &:hover {
          transform: scale(1.1);
          transition: 0.3s;
        }
  }
`;

const Title = styled.title`
  display: -webkit-box;
  margin: 7px 0;
  height: 40px;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: rgb(27, 28, 29);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  position: absolute;
  bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: rgb(27, 28, 29);
`;

const StyledHeartButton = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0',
  width: '21px',
  height: '21px'
};

const StyledHoverButton = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  &:hover {
    background-color: #ffffff50;
  }
`;

export default ProductItem;
