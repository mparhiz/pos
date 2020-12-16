import { TestBed, getTestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';

import { ProductEffects } from '.';
import { Product } from '../../models/pruduct.model';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { PaymentType } from '../../enums/enums';

describe('ProductEffects', () => {
  let productService: ProductService;
  let injector: TestBed;
  let actions$: Observable<Action>;
  const dummyProductListResponse: Product[] = [
    { id: "1", name: "can 1", category: "can", price: 1.95, imageUrl: "http://test", qty: 1 },
    { id: "2", name: "can 2", category: "can", price: 1.95, imageUrl: "http://test", qty: 1 },
    { id: "3", name: "can 3", category: "can", price: 1.95, imageUrl: "http://test", qty: 1 },
    { id: "4", name: "can 4", category: "can", price: 1.95, imageUrl: "http://test", qty: 1 }
  ];
  const localstorageData = JSON.stringify({
    "productList":dummyProductListResponse,
    "totalCashPayment":0,
    "totalCreditPayment":0,
    "numberOfProductSold":0
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        ProductService,
        ProductEffects,
        [provideMockActions(() => actions$)],
      ]
    });
    injector = getTestBed();
    productService = injector.get(ProductService);

    var store = {};
    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
      if(key === "pos_app") return localstorageData;
      return null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = localstorageData;
    });
  });

  it('should get products', () => {
      const actions = new Actions(
          of({ type: '[Products] Fetch Request' })
      );

      // create the effect
      const effects = new ProductEffects(productService, actions);

      spyOn(productService, 'getProducts').and.returnValue(of(dummyProductListResponse));

      // expect remains the same
      effects.fetchProducts$.subscribe(action => {
          expect(action).toEqual({
              type: '[Products] Fetch Success',
              productList: dummyProductListResponse,
          });
      });
  });

  it('should return failur on fetchProducts$', () => {
      const actions = new Actions(
          of({ type: '[Products] Fetch Request' })
      );

      const effects = new ProductEffects(productService, actions);

      spyOn(productService, 'getProducts').and.rejectWith();

      effects.fetchProducts$.subscribe(action => {
          expect(action.type).toEqual('[Products] Fetch Failed');
      });
  });

  it('should update products', () => {
      const actions = new Actions(
        of({
          type: '[Product] Update Request',
          productId: "1",
          paymentType: PaymentType.Cash
        })
      );

      const effects = new ProductEffects(productService, actions);

      effects.updateProduct$.subscribe(action => {
        expect(action.totalCashPayment).toEqual(1.95);
        expect(action.numberOfProductSold).toEqual(1);
      });
  });

  it('should reset POS', () => {
    const actions = new Actions(
      of({ type: '[POS] Reset Request' })
    );

    const effects = new ProductEffects(productService, actions);

    effects.resetPos$.subscribe(action => {
        expect(action.type).toEqual('[POS] Reset Success');
        expect(action.productList.length).toEqual(10);
    });
  });
});
