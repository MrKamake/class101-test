import React, { useContext } from 'react';
import { CartContext } from '../../App.js';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

const CartItem = ({ item, coupons }) => {
  const { cartlist, setCartlist } = useContext(CartContext);
  const {
    product: { id, title, coverImage, price, availableCoupon },
    selected,
    quantity
  } = item;

  const toggleSelected = id => {
    const toggled = cartlist.map(item => {
      const { product, selected } = item;
      return product.id === id ? { ...item, selected: !selected } : item;
    });
    setCartlist(toggled);
  };

  const handleChangeCount = (id, { target: { value } }) => {
    const changed = cartlist.map(item => {
      const { product } = item;
      return product.id === id ? { ...item, quantity: value } : item;
    });
    setCartlist(changed);
  };

  const removeCartlist = id => {
    setCartlist(cartlist.filter(({ product }) => product.id !== id));
  };

  return (
    <ProductItemWrapper>
      <input
        type="checkbox"
        checked={selected}
        onChange={toggleSelected.bind(this, id)}
      />
      <Img src={coverImage} alt={title} />
      <Title>{title}</Title>
      <HeartButton onClick={removeCartlist.bind(this, id)}>
        <FaHeart className="heart-icon" size="21px" />
      </HeartButton>
      <Price>{price}원</Price>
      <input
        type="number"
        value={quantity}
        onChange={handleChangeCount.bind(this, id)}
      />
    </ProductItemWrapper>
  );
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

export default CartItem;
