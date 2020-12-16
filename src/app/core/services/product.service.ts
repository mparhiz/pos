import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { PaymentType } from '../enums/enums';
import { Product } from '../models/pruduct.model';

@Injectable()
export class ProductService {
  storageName = "pos_app";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/mockData/products.json');
  }

  initLocalstorage(products: Product[]) {
    const data = {
      productList: products,
      totalCashPayment: 0,
      totalCreditPayment: 0,
      numberOfProductSold: 0,
    };

    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  updateProductInLocalstorage(productId: string, paymentType: PaymentType): Observable<any> {
    let storedData = JSON.parse(localStorage.getItem(this.storageName));
    let product = storedData.productList.find(({ id }) => id === productId);
    product.qty = product.qty - 1;

    if (paymentType === PaymentType.Cash) {
      storedData.totalCashPayment += product.price;
    } else if (paymentType === PaymentType.CreditCard) {
      storedData.totalCreditPayment += product.price;
    };

    ++storedData.numberOfProductSold;
    localStorage.setItem(this.storageName, JSON.stringify(storedData));

    return of(storedData);
  }
}
