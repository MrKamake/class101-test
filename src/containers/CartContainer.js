import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../App';
import { getDataApi } from '../api';
import ProductItem from '../components/common/ProductItem';
import CartItemViewer from '../components/cart/CartItemViewer';

const CartContainer = ({ cartList }) => {
  const { setCartList } = useContext(CartContext);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    getDataApi('coupons').then(coupons => {
      setCoupons(coupons);
    });
  }, []);

  const toggleSelected = id => {
    const toggled = cartList.map(item => {
      const { product, selected } = item;
      return product.id === id ? { ...item, selected: !selected } : item;
    });
    setCartList(toggled);
  };

  const handleChangeCount = (id, { target: { value } }) => {
    const changed = cartList.map(item => {
      const { product } = item;
      return product.id === id ? { ...item, quantity: value } : item;
    });
    setCartList(changed);
  };

  const handleChangeCoupon = (id, { target: { value } }) => {
    const [type, discount] = value.split(',');
    const changed = cartList.map(item => {
      const { product } = item;
      return product.id === id
        ? { ...item, coupon: { type, discount: +discount } }
        : item;
    });
    setCartList(changed);
  };

  const removeCartlist = product => {
    setCartList(cartList.filter(item => item.product.id !== product.id));
  };

  if (cartList.length === 0) return null;

  return cartList.map(item => (
    <CartItemViewer
      key={item.product.id}
      item={item}
      coupons={coupons}
      toggleItem={toggleSelected}
      onChangeCount={handleChangeCount}
      onChangeCoupon={handleChangeCoupon}
      productCard={
        <ProductItem
          key={item.product.id}
          product={item.product}
          onClick={removeCartlist}
          cartList={cartList}
        />
      }
    />
  ));
};

CartContainer.defaultProps = {
  cartList: []
};

CartContainer.propTypes = {
  cartList: PropTypes.array
};

export default CartContainer;
