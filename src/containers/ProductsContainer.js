import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';
import { getDataApi } from '../api';
import Loading from '../components/common/Loading';
import ProductItem from '../components/common/ProductItem';
import PageNation from '../components/product/PageNation';
import { TRIM_NUMBER } from '../constants';

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
      productItems.slice(startSliceNumber, startSliceNumber + TRIM_NUMBER)
    );
  };

  const toggleItem = product => {
    const callback = item => item.product.id !== product.id;
    const isInCartList = cartList.every(callback);

    if (!isInCartList) {
      setCartList(cartList.filter(callback));
    } else if (cartList.length < 3) {
      setCartList([
        ...cartList,
        {
          product,
          selected: true,
          quantity: 1,
          coupon: {
            type: '',
            discount: 0
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
