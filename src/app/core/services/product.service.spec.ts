import { HttpClientModule } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../models/pruduct.model';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let Services: ProductService;
    let injector: TestBed;
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
          imports: [HttpClientModule],
          providers: [ProductService],
      });

      injector = getTestBed();
      Services = injector.get(ProductService);

      var store = {};
      spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
        if(key === "pos_app") return localstorageData;
        return null;
      });
      spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
        return store[key] = localstorageData;
      });

      spyOn(Services, 'getProducts').and.returnValue(of(dummyProductListResponse));
    });

    it('getProducts() should return data', () => {
        Services.getProducts().subscribe((res) => {
          expect(res).toEqual(dummyProductListResponse);
        });
    });

    it('updateProductInLocalstorage() should update first product by cash payment and decrise the total amount of Cash', () => {
        Services.updateProductInLocalstorage('1', 1).subscribe((res) => {
          expect(res.productList[0].qty).toEqual(0);
          expect(res.numberOfProductSold).toEqual(1);
          expect(res.totalCashPayment).toEqual(1.95);
        });
    });
});
