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
    <div>
      <Img src={coverImage} alt={title} />
      <h3>{title}</h3>
      <p>{price}</p>
      <StyledHeartButton onClick={toggleItem.bind(this, id)}>
        {cartList.every(v => v.id !== id) ? (
          <FaRegHeart className="heart-empty-icon" />
        ) : (
          <FaHeart className="heart-icon" />
        )}
      </StyledHeartButton>
    </div>
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

const Img = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  border-radius: 3px;
`;

const StyledHeartButton = styled.div`
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
