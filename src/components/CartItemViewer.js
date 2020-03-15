import React from 'react';
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

  const renderCouopns = () => {
    return (
      <>
        <option value="none, 0">쿠폰 선택</option>
        {coupons.map(({ title, type, discountAmount, discountRate }) => (
          <option value={[type, discountRate || discountAmount]} key={title}>
            {title}
          </option>
        ))}
      </>
    );
  };

  return (
    <>
      {productCard}
      <StyledCheckbox
        type="checkbox"
        checked={selected}
        onChange={() => toggleItem(id)}
      />
      <SelectWrapper>
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
    </>
  );
};

const StyledCheckbox = styled.input`
  position: absolute;
  top: 8px;
  left: 8px;
  cursor: pointer;
  transform: scale(1.3);
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CartItemViewer;
