import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TousComponent } from './tous/tous.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details.component';
import { CartComponent } from './cart/cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutComponent } from './about/about.component';
import { ConatctComponent } from './conatct/conatct.component';
import { CatalogComponent } from './catalog/catalog.component'; 

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home " },
  { path: 'car-air-filters', component: CatalogComponent, title: "car air filters" },
  { path: 'details/:id', component: ProductDetailsComponent, title: "details" },
  { path: 'about', component: AboutComponent, title: "About" },
  { path: 'contact', component: ConatctComponent, title: "Contact" },
  { path: 'cart', component: CartComponent, title: "cart" },
  { path: 'search', component: SearchResultsComponent, title: "Search Results" },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
