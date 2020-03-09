import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App.js';
import { getDataApi } from '../../utils';
import CartItem from './CartItem';

const Cart = () => {
  const [coupons, setCoupons] = useState([]);
  const { cartList } = useContext(CartContext);

  useEffect(() => {
    getDataApi('coupons').then(coupons => {
      setCoupons(coupons);
    });
  }, []);

  return (
    <div>
      <div>찜한 클래스</div>
      {!cartList.length && <Link to="/products">Class를 찜해주세요~</Link>}
      {cartList.map(item => (
        <CartItem key={item.product.id} item={item} coupons={coupons} />
      ))}
    </div>
  );
};

export default Cart;
