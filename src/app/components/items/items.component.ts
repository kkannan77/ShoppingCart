import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../../services/items.service";
import { Item } from "../../models/Item";
import { ShoppingcartService } from "../../services/shoppingcart.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
  item: Item = {
    productId: "",
    productName: "",
    price: 0
  };
  items: Item[];
  itemCount: number;
  constructor(
    private itemsService: ItemsService,
    private shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit() {
    this.itemsService.getItems().subscribe(items => (this.items = items));
  }

  addItemToCart(item: Item) {
    this.shoppingcartService.addItem(item);
    this.shoppingcartService.getCartLength();
    this.item.countInCart = this.getItemCountinCart(item);
  }
  removeItemFromCart(item: Item) {
    this.shoppingcartService.removeItem(item);
    this.shoppingcartService.getCartLength();
    this.item.countInCart = this.getItemCountinCart(item);
  }

  getItemCountinCart(item: Item): number {
    return this.shoppingcartService.getItemCountinCart(item);
  }
}
