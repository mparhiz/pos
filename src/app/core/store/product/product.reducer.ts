import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';

import * as productActions from './product.actions';
import { Product } from '../../models/pruduct.model';

export const productFeatureKey = 'product';

export interface ProductState {
  productList: Product[];
  totalCashPayment: number;
  totalCreditPayment: number;
  numberOfProductSold: number;
  serverError: any;
}

export const initialState: ProductState = {
  productList: new Array<Product>(),
  totalCashPayment: 0,
  totalCreditPayment: 0,
  numberOfProductSold: 0,
  serverError: undefined
};

const reducer = createReducer(
  initialState,
  on(productActions.ProductsFetchSuccessAction, (state: ProductState, action) => {
    return { ...state, productList: action.productList };
  }),
  on(productActions.ProductsUpdateSuccessAction, (state: ProductState, action) => {
    return {
      ...state,
      productList: action.productList,
      totalCashPayment: action.totalCashPayment,
      totalCreditPayment: action.totalCreditPayment,
      numberOfProductSold: action.numberOfProductSold
    }
  }),
  on(productActions.ProductsFetchFailedAction, (state: ProductState, action) => {
    return { ...state, serverError: action.error };
  }),
  on(productActions.ProductsUpdateFailedAction, (state: ProductState, action) => {
      return { ...state, serverError: action.error };
  }),
  on(productActions.ResetPosSuccessAction, (state: ProductState, action) => {
    return { ...initialState, productList: action.productList };
  }),
  on(productActions.ResetPosFailedAction, (state: ProductState, action) => {
    return { ...state, serverError: action.error };
  })
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectFeature = createFeatureSelector<ProductState>(productFeatureKey);

export const selectFeatureProducts = createSelector(
  selectFeature,
  (state: ProductState) => state.productList
);
export const selectFeatureTotalCashPayment = createSelector(
  selectFeature,
  (state: ProductState) => state.totalCashPayment
);
export const selectFeatureTotalCreditPayment = createSelector(
  selectFeature,
  (state: ProductState) => state.totalCreditPayment
);
export const selectFeatureNumberOfProductSold = createSelector(
  selectFeature,
  (state: ProductState) => state.numberOfProductSold
);
export const selectFeatureServerError = createSelector(
  selectFeature,
  (state: ProductState) => state.serverError
);

export const metaReducers: MetaReducer<ProductState>[] = [];
