import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api/products';
  private products: IProduct[] = [];

  constructor(private http: HttpClient) { }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl).pipe(
      tap((data) => (this.products = data))
    );
  }
  getProductById(id: number): Observable<IProduct | undefined> {
    if (this.products.length > 0) {
      return new Observable((observer) => {
        const product = this.products.find((product) => product.id === id);
        observer.next(product);
        observer.complete();
      });
    } else {
      return this.getProducts().pipe(
        map((products) => products.find((product) => product.id === id))
      );
    }
  }
}
