import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import CartContainer from '../containers/CartContainer';
import colors from '../styles/colors';
import TotalPrice from '../components/TotalPrice'

const Cart = () => {
  const { cartList } = useContext(CartContext);
  const emptyCartList = cartList.length === 0;

  return (
    <StyledCart>
      <Title>찜한 클래스</Title>
      <CartWrapper isHave={!emptyCartList}>
        {!emptyCartList || <Link to="/products">Class를 찜해주세요 :)</Link>}
        <CartContainer cartList={cartList} />
      </CartWrapper>
      {!emptyCartList && <TotalPrice />}
    </StyledCart>
  );
};

const StyledCart = styled.div`
  margin: 0 auto;
  width: 62%;
`;

const CartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: ${props => props.isHave || '600px'};
  background-color: ${props =>
    props.isHave ? `${colors.white}` : `${colors.lightGray}`};
  border-radius: 3px;
  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
    color: ${colors.classRedyellow};
    font-size: 1.5rem;
  }
`;

const Title = styled.h2`
  margin: 4% 0;
  font-weight: bold;
`;

export default Cart;
