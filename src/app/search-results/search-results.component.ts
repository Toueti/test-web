import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../tous/produit.service';  // Ensure the correct path to your ProductService
import { IProduct } from '../tous/product.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  products: IProduct[] = [];
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'] || '';
        console.log('Search query:', this.searchQuery);
        this.searchProducts(this.searchQuery);
    });
}

  searchProducts(query: string) {
    this.productService.getProducts().subscribe(products => {
      this.products = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  getImageUrl(product: IProduct): string {
    return `../../assets/products/${product.imageName}`;
  }
}
