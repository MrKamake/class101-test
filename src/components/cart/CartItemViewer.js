import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Coupon from './Coupon';
import colors from '../../styles/colors';

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
  input[type='checkbox'] {
    position: relative;
    margin-right: 10px;
    line-height: 16px;
    font-size: 18px;
    cursor: pointer;
    &:before {
      position: absolute;
      height: 16px;
      width: 16px;
      border: 1px solid ${colors.gray};
      border-radius: 5px;
      background: ${colors.white};
      content: '';
    }
    &:checked {
      &:before {
        content: '✔';
      }
    }
    &:hover {
      &:before {
        border: 1px solid ${colors.skyblue};
      }
    }
  }
  input[type='number'] {
    position: relative;
    font-size: 11px;
    cursor: pointer;
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    background: ${colors.white};
    width: 90px;
    &:hover {
      &:before {
        border: 1px solid ${colors.skyblue};
      }
    }
  }
  select {
    position: relative;
    font-size: 11px;
    cursor: pointer;
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    background: ${colors.white};
    &:hover {
      &:before {
        border: 1px solid ${colors.skyblue};
      }
    }
  }
`;

export default CartItemViewer;
