import { Product } from './pruduct.model';

export interface AppState {
  productList: Product[];
  totalCashPayment: number;
  totalCreditPayment: number;
  numberOfProductSold: number;
}
