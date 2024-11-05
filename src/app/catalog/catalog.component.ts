import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './produit.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [
    ProductDetailsComponent,  // Import the ProductDetailsComponent
    CommonModule  // Import CommonModule to use Angular directives like ngIf, ngClass
  ]
})
export class CatalogComponent {
  products: any;
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.queryParams.subscribe((filter) => {
      this.filter = filter['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
        (product: any) => product.category === this.filter
      );
  }
}
