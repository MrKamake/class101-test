import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';
import { getDataApi } from '../api';
import Loading from '../components/common/Loading';
import ProductItem from '../components/common/ProductItem';
import PageNation from '../components/product/PageNation';
import {
  TRIM_NUMBER,
  NUMBER_OF_ITEMS,
  UP_TO_THREE,
  INITIAL_QUANTITY,
  INITIAL_NUMBER
} from '../constants';

const ProductsContainer = () => {
  const [productItems, setProductItems] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const { cartList, setCartList } = useContext(CartContext);

  useEffect(() => {
    getDataApi('productItems').then(res => {
      res.sort((a, b) => b.score - a.score);
      setProductItems(res);
      setPageItems(res.slice(0, TRIM_NUMBER));
    });
  }, []);

  const handleChangePage = page => {
    const startSliceNumber = 5 * (page - 1);
    setPageItems(
      productItems.slice(startSliceNumber, startSliceNumber + NUMBER_OF_ITEMS)
    );
  };

  const toggleItem = product => {
    const callback = item => item.product.id !== product.id;
    const isCartList = cartList.every(callback);

    if (!isCartList) {
      setCartList(cartList.filter(callback));
    } else if (cartList.length < UP_TO_THREE) {
      setCartList([
        ...cartList,
        {
          product,
          selected: true,
          quantity: INITIAL_QUANTITY,
          coupon: {
            type: '',
            discount: INITIAL_NUMBER
          }
        }
      ]);
    } else {
      alert('장바구니에는 3개까지 담을 수 있어요. :)');
    }
  };

  if (productItems.length === 0) return <Loading />;

  return (
    <>
      {pageItems.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={toggleItem}
          cartList={cartList}
        />
      ))}
      <PageNation
        numberOfItems={productItems.length}
        onChagePage={handleChangePage}
      />
    </>
  );
};

export default ProductsContainer;
