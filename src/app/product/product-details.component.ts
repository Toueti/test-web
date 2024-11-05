import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../tous/produit.service';  // Assuming you have a ProductService
import { IProduct } from '../tous/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | undefined;
  message: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });
  }
  getImageUrl(product: IProduct): string {
    if (!product) return '';
    return `../../assets/Air Filter/${product.imageName}`;
  }
  async addToCart() {
    if (this.product) {
      if (await this.cartService.add(this.product)) {
        this.message = `${this.product.name} has been added to the cart!`;
        setTimeout(() => {
          this.message = null;
        }, 2000);
      }
    }

  }
}
