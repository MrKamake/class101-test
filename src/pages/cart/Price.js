import React, { useContext } from 'react';
import { CartContext } from '../../App';
import styled from 'styled-components';

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
    <PriceWrapper>
      <StyledPrice>
        <Title>결제 금액</Title>
        <Table>
          <TableBody>
            <tr>
              <th>총 상품 금액</th>
              <td>{getTotalPrice()} 원</td>
            </tr>
            <tr className="discount-text">
              <th>상품 할인 금액</th>
              <td>- {getDiscountPrice()}원</td>
            </tr>
          </TableBody>
          <TableFoot>
            <tr>
              <th>최종 가격</th>
              <td>{getTotalPrice() - getDiscountPrice()}원</td>
            </tr>
          </TableFoot>
        </Table>
      </StyledPrice>
    </PriceWrapper>
  );
};

const PriceWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  padding-top: 20px;
  border-top: solid;
  border-width: 1px;
  border-color: F8F8F9;
`;

const StyledPrice = styled.div`
  position: absolute;
  right: 0;
  width: 40%;
  padding: 20px;
  background-color: #f8f8f9;
  border-radius: 3px;
`;

const Title = styled.h4`
  margin: 0px;
  padding-bottom: 15px;
  line-height: 28px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(62, 64, 66);
  letter-spacing: -0.3px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableBody = styled.tbody`
  tr {
    th,
    td {
      margin: 0px;
      padding: 7px 0px;
      font-weight: normal;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      letter-spacing: -0.2px;
      color: rgb(133, 138, 141);
    }
    th {
      text-align: left;
    }
    td {
      text-align: right;
    }
  }
  .discount-text {
    th,
    td {
      color: #ff912a;
    }
  }
`;

const TableFoot = styled.tfoot`
  tr {
    th,
    td {
      margin: 0px;
      padding-top: 15px;
      border-top: 1px solid #ddd;
      ont-size: 14px;
      font-weight: bold;
      line-height: 20px;
      letter-spacing: -0.2px;
      color: rgb(62, 64, 66);
    }
    th {
      text-align: left;
    }
    td {
      text-align: right;
    }
  }
`;

export default Price;
