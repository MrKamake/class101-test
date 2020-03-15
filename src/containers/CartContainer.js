import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';
import { getDataApi } from '../api';
import ProductItem from '../components/ProductItem';
import TotalPrice from '../components/TotalPrice';
import CartItemViewer from '../components/CartItemViewer';

const CartContainer = ({ cartList }) => {
  const { setCartList } = useContext(CartContext);
  const [coupons, setCoupons] = useState([]);
  const emptyCartList = cartList.length === 0;

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

  return (
    <>
      {cartList.map(item => {
        return (
          <>
            <CartItemViewer
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
          </>
        );
      })}
      {!emptyCartList && <TotalPrice />}
    </>
  );
};

export default CartContainer;
