import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Coupon from './Coupon';

const CartItemViewer = ({
  item,
  coupons,
  toggleItem,
  onChangeCount,
  onChangeCoupon,
  productCard
}) => {
  const {
    product: { id, availableCoupon },
    selected,
    quantity
  } = item;

  return (
    <CartItemViewerWrapper>
      {productCard}
      <SelectWrapper>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleItem(id)}
        />
        <input
          type="number"
          value={quantity}
          onChange={e => onChangeCount(id, e)}
        />
        <select onChange={e => onChangeCoupon(id, e)}>
          {availableCoupon === false ? (
            <option>쿠폰을 사용할 수 없는 제품이에요.</option>
          ) : (
            <Coupon coupons={coupons} />
          )}
        </select>
      </SelectWrapper>
    </CartItemViewerWrapper>
  );
};

CartItemViewer.defaultProps = {
  coupons: []
};

CartItemViewer.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.string,
      availableCoupon: PropTypes.bool
    }),
    selected: PropTypes.bool
  }),
  coupons: PropTypes.array,
  toggleItem: PropTypes.func,
  onChangeCount: PropTypes.func,
  onChangeCoupon: PropTypes.func,
  productCard: PropTypes.object
};

const CartItemViewerWrapper = styled.div`
  margin: 2% 3%;
  div {
    margin: 0;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CartItemViewer;
