import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Components
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ItemsComponent } from "./components/items/items.component";
import { ShoppingcartComponent } from "./components/shoppingcart/shoppingcart.component";
import { LandingComponent } from "./components/landing/landing.component";
// Services
import { ShoppingcartService } from "./services/shoppingcart.service";
import { ItemsService } from "./services/items.service";
import { DiscountService } from "./services/discount.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsComponent,
    ShoppingcartComponent,
    LandingComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  exports: [NavbarComponent],
  providers: [ShoppingcartService, ItemsService, DiscountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
