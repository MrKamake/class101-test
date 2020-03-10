import React, { useContext } from 'react';
import { CartContext } from '../../App';

const Price = () => {
  const { cartList } = useContext(CartContext);

  const getTotalPrice = () =>
    cartList.reduce(
      (totalPrice, { product: { price }, selected, quantity }) =>
        selected ? totalPrice + price * quantity : totalPrice,
      0
    );

  const getDiscountPrice = () =>
    cartList.reduce((totalDiscount, item) => {
      const {
        product: { price },
        selected,
        quantity,
        coupon: { type, discount }
      } = item;

      return selected
        ? type === 'rate'
          ? totalDiscount + (price * quantity) / discount
          : type === 'amount'
          ? totalDiscount + discount
          : totalDiscount
        : totalDiscount;
    }, 0);

  return (
    <div>
      <p>총 선택 상품</p>
      <p>총 상품 가격</p>
      {getTotalPrice()} <span>원</span>
      <p>할인</p>
      {getDiscountPrice()} <span>원</span>
      <p>총 결제금액</p>
      {getTotalPrice() - getDiscountPrice()} <span>원</span>
    </div>
  );
};

export default Price;
