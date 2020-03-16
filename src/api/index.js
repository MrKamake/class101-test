import productItems from './../mock-data/productItems';
import coupons from './../mock-data/coupons';

const data = { coupons, productItems };

const getDataApi = dataName =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data[dataName]);
    }, 1500);
  });

export { getDataApi };
