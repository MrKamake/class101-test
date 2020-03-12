import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { getDataApi } from '../../api';
import CartItem from './CartItem';
import Price from './Price';
import styled from 'styled-components';

const Cart = () => {
  const [coupons, setCoupons] = useState([]);
  const { cartList } = useContext(CartContext);

  useEffect(() => {
    getDataApi('coupons').then(coupons => {
      setCoupons(coupons);
    });
  }, []);

  return (
    <StyledCart>
      <Title>찜한 클래스</Title>
      <CartItemsWrapper isHave={cartList.length !== 0 ? true : false}>
        {cartList.length !== 0 || (
          <Link to="/products">Class를 찜해주세요 :)</Link>
        )}
        {cartList.map(item => (
          <CartItem key={item.product.id} item={item} coupons={coupons} />
        ))}
      </CartItemsWrapper>
      {cartList.length !== 0 && <Price />}
    </StyledCart>
  );
};

const StyledCart = styled.div`
  margin: 0 auto;
  width: 62%;
`;

const Title = styled.h2`
  display: block;
  font-weight: bold;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: ${props => props.isHave || '600px'};
  background-color: ${props => (props.isHave ? '#FFFFFF' : '#f8f8f9')};
  border-radius: 3px;
  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
    color: #f33240;
    font-size: 1.5rem;
  }
`;

export default Cart;
