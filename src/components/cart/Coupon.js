import React from 'react';

const Coupon = ({ coupons }) => {
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

export default Coupon;
