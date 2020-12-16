import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/pruduct.model';
import { PaymentType } from '../../enums/enums';

// actions
//----- Fetch Products
export const ProductsFetchAction = createAction(
    '[Products] Fetch Request'
);
export const ProductsFetchSuccessAction = createAction(
    '[Products] Fetch Success',
    props<{ productList: Product[] }>()
);
export const ProductsFetchFailedAction = createAction(
    '[Products] Fetch Failed',
    props<{ error: any }>()
);

//----- Update Product
export const ProductUpdateAction = createAction(
    '[Product] Update Request',
    props<{ productId: string, paymentType: PaymentType }>()
);
export const ProductsUpdateSuccessAction = createAction(
    '[Products] Update Success',
    props<{
      productList: Product[],
      totalCashPayment: number,
      totalCreditPayment: number,
      numberOfProductSold: number,
     }>()
);
export const ProductsUpdateFailedAction = createAction(
    '[Products] Update Failed',
    props<{ error: any }>()
);

//----- Reset POS
export const ResetPosAction = createAction(
  '[POS] Reset Request'
);
export const ResetPosSuccessAction = createAction(
  '[POS] Reset Success',
  props<{ productList: Product[] }>()
);
export const ResetPosFailedAction = createAction(
  '[POS] Reset Failed',
  props<{ error: any }>()
);
