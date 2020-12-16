import * as fromProduct from './product.reducer';
import * as productActions from './product.actions';
import { Product } from '../../models/pruduct.model';

describe('productReducer', () => {
  const productInfo_10 = new Product();
  const productInfo_20 = new Product();
  const productInfo_30 = new Product();

  beforeAll(() => {
    productInfo_10.id = "10";
    productInfo_10.name = 'can 1';

    productInfo_20.id = "20";
    productInfo_20.name = 'can 2';
    productInfo_20.qty = 0;

    productInfo_30.id = "30";
    productInfo_30.name = 'can 3';
  });

  it('should return initial state first', () => {
    const action = {} as any;
    const result = fromProduct.productReducer(undefined, action);
    expect(result).toBe(fromProduct.initialState);
  });

  it('should return products', () => {
    const productList = [productInfo_10];
    const state = fromProduct.initialState;
    const action = productActions.ProductsFetchSuccessAction({ productList });

    const result: fromProduct.ProductState = fromProduct.productReducer(state, action);

    expect(result.productList.length).toEqual(1);
    expect(result.productList[0].id).toEqual("10");
    expect(result.productList[0].name).toEqual('can 1');
  });

  it('should update product', () => {
    const productList = [productInfo_20];
    const state = fromProduct.initialState;
    const action = productActions.ProductsUpdateSuccessAction({
      productList: productList,
      totalCashPayment: 0,
      totalCreditPayment: 0,
      numberOfProductSold: 1
    });

    const result: fromProduct.ProductState = fromProduct.productReducer(state, action);

    expect(result.productList.length).toEqual(1);
    expect(result.productList[0].qty).toEqual(0);
    expect(result.numberOfProductSold).toEqual(1);
  });

  it('should reset POS successfuly', () => {
    const productList = [productInfo_30];
    const state = fromProduct.initialState;
    const action = productActions.ResetPosSuccessAction({productList});

    const result: fromProduct.ProductState = fromProduct.productReducer(state, action);

    expect(result.productList[0].name).toEqual('can 3');
    expect(result.numberOfProductSold).toEqual(0);
  });

});
