import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../App.js';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

const ProductItem = product => {
  const { id, title, coverImage, price } = product;
  const { cartList, setCartList } = useContext(CartContext);

  const toggleItem = id => {
    const callback = ({ product }) => product.id !== id;
    cartList.every(callback)
      ? cartList.length < 3
        ? setCartList([...cartList, product])
        : alert('장바구니에는 최대 3개까지 담을 수 있어요^^')
      : setCartList(cartList.filter(callback));
  };

  return (
    <ProductItemWrapper>
      <Img src={coverImage} alt={title} />
      <Title>{title}</Title>
      <Price>{price}</Price>
      <HeartButton onClick={toggleItem.bind(this, id)}>
        {cartList.every(v => v.id !== id) ? (
          <FaRegHeart className="heart-empty-icon" size="21px" />
        ) : (
          <FaHeart className="heart-icon" size="21px" />
        )}
      </HeartButton>
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
  width: 280px;
  height: 290px;
  margin: 2% 3%;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  border-radius: 3px;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
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
  left: 10px;
  bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: rgb(27, 28, 29);
`;

const HeartButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.4);
    transition: 0.3s;
  }
  .heart-icon {
    color: #fa5b4a;
  }
  .heart-empty-icon {
    color: white;
  }
`;

export default ProductItem;
