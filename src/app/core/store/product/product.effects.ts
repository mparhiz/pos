import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as productActions from './product.actions';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable()
export class ProductEffects {

  fetchProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.ProductsFetchAction),
    mergeMap(() => this.productService.getProducts()
      .pipe(
          map(productList => {
            this.productService.initLocalstorage(productList);
            return productActions.ProductsFetchSuccessAction({productList});
          }),
          catchError(() => productActions.ProductsFetchFailedAction)
      )
    )
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.ProductUpdateAction),
    mergeMap((action) => this.productService.updateProductInLocalstorage(action.productId, action.paymentType)
      .pipe(
        map(({
          productList,
          totalCashPayment,
          totalCreditPayment,
          numberOfProductSold
        }) => productActions.ProductsUpdateSuccessAction({
          productList,
          totalCashPayment,
          totalCreditPayment,
          numberOfProductSold
        })),
        catchError(() => productActions.ProductsUpdateFailedAction)
      )
    )
  ));

  resetPos$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.ResetPosAction),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(productList => {
          this.productService.initLocalstorage(productList);
          return productActions.ResetPosSuccessAction({productList})
        }),
        catchError(() => productActions.ResetPosFailedAction)
      )
    )
  ));

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) { }
}
