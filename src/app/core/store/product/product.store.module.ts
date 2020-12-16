import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProduct.productFeatureKey,
      fromProduct.productReducer,
      { metaReducers: fromProduct.metaReducers }
    ),
    EffectsModule.forRoot([ProductEffects])
  ]
})
export class ProductStoreModule { }
