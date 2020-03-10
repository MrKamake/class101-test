import React, { useContext } from 'react';
import { CartContext } from '../../App';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

const CartItem = ({ item, coupons }) => {
  const { cartList, setCartList } = useContext(CartContext);
  const {
    product: { id, title, coverImage, price, availableCoupon },
    selected,
    quantity
  } = item;

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

  const renderCouopns = () => {
    return (
      <>
        <option value="none, 0">쿠폰 선택 가능</option>
        {coupons.map(coupon => (
          <option
            value={[coupon.type, coupon.discountRate || coupon.discountAmount]}
            key={coupon.title}
          >
            {coupon.title}
          </option>
        ))}
      </>
    );
  };

  const removeCartlist = id => {
    setCartList(cartList.filter(({ product }) => product.id !== id));
  };

  return (
    <>
      <input
        type="checkbox"
        checked={selected}
        onChange={toggleSelected.bind(this, id)}
      />
      <ProductItemWrapper>
        <Img src={coverImage} alt={title} />
        <Title>{title}</Title>
        <HeartButton onClick={removeCartlist.bind(this, id)}>
          <FaHeart className="heart-icon" size="21px" />
        </HeartButton>
        <Price>{price}원</Price>
        <input
          type="number"
          value={quantity}
          onChange={handleChangeCount.bind(this, id)}
        />
        <select onChange={handleChangeCoupon.bind(this, id)}>
          {availableCoupon === false ? (
            <option>쿠폰을 사용할 수 없는 제품이에요.</option>
          ) : (
            renderCouopns()
          )}
        </select>
      </ProductItemWrapper>
    </>
  );
};

const ProductItemWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 290px;
  margin: 2% 3%;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  border-radius: 3px;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const Title = styled.title`
  display: -webkit-box;
  margin: 7px 0;
  height: 40px;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: rgb(27, 28, 29);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: rgb(27, 28, 29);
`;

const HeartButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.4);
    transition: 0.3s;
  }
  .heart-icon {
    color: #fa5b4a;
  }
  .heart-empty-icon {
    color: white;
  }
`;

export default CartItem;
