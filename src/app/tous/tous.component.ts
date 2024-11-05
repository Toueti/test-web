import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './produit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tous',
  templateUrl: './tous.component.html',
  styleUrls: ['./tous.component.css']
})
export class TousComponent implements OnInit {
  products: IProduct[] = [];
  filter: string = '';
  private productsSub!: Subscription;
  private routeSub!: Subscription;

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productsSub = this.productSvc.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }
  getFilteredProducts(): IProduct[] {
    if (!this.products) return [];
    return this.filter === ''
      ? this.products
      : this.products.filter((product: IProduct) => product.category === this.filter);
  }
  getImageUrl(product: IProduct): string {
    if (!product) return '';
    return `../../assets/products/${product.imageName}`;
  }
}
