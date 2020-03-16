import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  const renderCouopns = () => (
    <>
      <option value="none, 0">쿠폰 선택</option>
      {coupons.map(({ title, type, discountAmount, discountRate }) => (
        <option value={[type, discountRate || discountAmount]} key={title}>
          {title}
        </option>
      ))}
    </>
  );

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
            renderCouopns()
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
