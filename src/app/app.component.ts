import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './core/models/app-state.model';
import { Product } from './core/models/pruduct.model';
import * as productActions from 'src/app/core/store/product/product.actions';
import * as fromReduser from 'src/app/core/store/product/product.reducer';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './core/shared/dialog/dialog.component';
import { PaymentType } from './core/enums/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  products$: Observable<Product[]>;
  totalCashAmount$: Observable<number>;
  totalCreditAmount$: Observable<number>;
  numberOfSeledProducts$: Observable<number>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.products$ = this.store.pipe(select(fromReduser.selectFeatureProducts));
    this.totalCashAmount$ = this.store.pipe(select(fromReduser.selectFeatureTotalCashPayment));
    this.totalCreditAmount$ = this.store.pipe(select(fromReduser.selectFeatureTotalCreditPayment));
    this.numberOfSeledProducts$ = this.store.pipe(select(fromReduser.selectFeatureNumberOfProductSold));
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.ProductsFetchAction());
  }

  onPayment(productId, paymentType: PaymentType, _this) {
    _this.store.dispatch(productActions.ProductUpdateAction({productId, paymentType}));
  }

  openDialog(product){
    const sendData = { ...product, callback: this.onPayment, _this: this };

    this.dialog.open(DialogComponent, {data: sendData});
  }

  onReset() {
    this.store.dispatch(productActions.ResetPosAction());
  }
}
