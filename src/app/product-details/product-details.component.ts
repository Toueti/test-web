import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [CommonModule , RouterModule]
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return `../../assets/Air Filter/${product.imageName}`;
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }
}
