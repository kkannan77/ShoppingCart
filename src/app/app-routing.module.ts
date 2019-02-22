import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";

import { ItemsComponent } from "./components/items/items.component";
import { ShoppingcartComponent } from "./components/shoppingcart/shoppingcart.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "items", component: ItemsComponent },
  { path: "cart", component: ShoppingcartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
