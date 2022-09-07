import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../model/product';

@Injectable()
export class ProductService {

    private productObs: BehaviorSubject<Product> = new BehaviorSubject({
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": 24,
        "inventoryStatus": "INSTOCK",
        "rating": 5
    });


    constructor(private http: HttpClient,
        
        ) { }

        
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductObs(): Observable<Product> {
        return this.productObs.asObservable();
    }

    setProductObs(product: Product) {
        this.productObs.next(product);
    }
}
