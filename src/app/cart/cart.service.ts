import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../tous/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct): Promise<boolean> {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
  
    return this.http.post('/api/cart', newCart).toPromise()
      .then(() => {
        console.log('Added ' + product.name + ' to cart!');
        return true; // Return true if the product is successfully added
      })
      .catch((err) => {
        console.error('Error adding product to cart', err);
        return false; // Return false if there was an error
      });
  }
  

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}