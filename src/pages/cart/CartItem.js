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
      <ProductItemWrapper>
        <ImageWrapper>
          <Img src={coverImage} alt={title} />
        </ImageWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={selected}
          onChange={toggleSelected.bind(this, id)}
        />
        <Title>{title}</Title>
        <HeartButton onClick={removeCartlist.bind(this, id)}>
          <FaHeart className="heart-icon" size="21px" />
        </HeartButton>
        <SelectWrapper>
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
        </SelectWrapper>
        <Price>{price}원</Price>
      </ProductItemWrapper>
    </>
  );
};

const ProductItemWrapper = styled.div`
  position: relative;
  margin: 2% 3%;
  width: 280px;
  height: 290px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`;

const StyledCheckbox = styled.input`
  position: absolute;
  top: 8px;
  left: 8px;
  cursor: pointer;
  transform: scale(1.3);
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
  height: 40px;
  padding: 6px 0;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: rgb(27, 28, 29);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: rgb(27, 28, 29);
`;

export default CartItem;
