import { Component, OnInit } from "@angular/core";
import { ShoppingcartService } from "../../services/shoppingcart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private shoppingcartService: ShoppingcartService) { }
  length: number;
  ngOnInit() {
    this.shoppingcartService.cartListLength.subscribe(
      length => (this.length = length)
    );
  }
}
