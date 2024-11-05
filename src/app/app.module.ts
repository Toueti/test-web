import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { TousComponent } from './tous/tous.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product/product-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutComponent } from './about/about.component';
import { ConatctComponent } from './conatct/conatct.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TousComponent,
    ProductDetailsComponent,
    SearchResultsComponent,
    AboutComponent,
    ConatctComponent,
    
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
