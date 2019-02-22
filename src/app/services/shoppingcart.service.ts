import { Injectable } from "@angular/core";
import { Shoppingcart } from "../models/Shoppingcart";
import { Item } from "../models/Item";
import { BehaviorSubject, Observable, of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ShoppingcartService {
  shoppingCart: Shoppingcart[] = [];
  private cartList = new BehaviorSubject<number>(0);
  cartListLength = this.cartList.asObservable();
  itemCartCount: number;
  item: Item = {
    productId: "",
    productName: "",
    price: 0
  };

  constructor() {
    if (localStorage.getItem("cart") != null) {
      this.shoppingCart = JSON.parse(localStorage.getItem("cart"));
    }
    this.getCartLength();
  }

  getCartItems(): Observable<Shoppingcart[]> {
    return of(this.shoppingCart);
  }

  addItem(item: Item) {
    let shoppingCartItem: Shoppingcart = {
      item: item,
      itemCount: 1,
      itemPrice: item.price
    };
    if (this.shoppingCart.length === 0) {
      this.shoppingCart.unshift(shoppingCartItem);
    } else {
      if (
        this.shoppingCart.filter(
          cartItem => cartItem.item.productId === item.productId
        ).length === 0
      ) {
        this.shoppingCart.unshift(shoppingCartItem);
      } else {
        this.shoppingCart
          .filter(cartItem => cartItem.item.productId === item.productId)
          .forEach((currentItem, currentIndex) => {
            currentItem.itemCount++;
            currentItem.itemPrice =
              currentItem.itemPrice + currentItem.item.price;
          });
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.shoppingCart));
  }

  removeItem(item: Item) {
    if (
      this.shoppingCart.filter(
        cartItem => cartItem.item.productId === item.productId
      ).length > 0
    ) {
      this.shoppingCart
        .filter(cartItem => cartItem.item.productId === item.productId)
        .forEach((currentItem, currentIndex) => {
          if (currentItem.itemCount === 1) {
            this.shoppingCart.splice(currentIndex, 1);
          } else {
            currentItem.itemCount--;
            currentItem.itemPrice =
              currentItem.itemPrice - currentItem.item.price;
          }
        });
    }
    localStorage.setItem("cart", JSON.stringify(this.shoppingCart));
  }
  getCartLength() {
    this.itemCartCount = 0;
    if (this.shoppingCart.length === 0) {
    } else {
      this.shoppingCart.forEach((currentItem, currentIndex) => {
        this.itemCartCount = this.itemCartCount + currentItem.itemCount;
      });
    }

    this.cartList.next(this.itemCartCount);
  }

  checkItemExistsinCart(item: Item): boolean {
    if (
      this.shoppingCart.filter(
        cartItem => cartItem.item.productId === item.productId
      ).length === 0
    ) {
      return false;
    }
    return true;
  }

  getItemCountinCart(item: Item): number {
    let count = 0;
    this.shoppingCart
      .filter(cartItem => cartItem.item.productId === item.productId)
      .forEach((currentItem, currentIndex) => {
        count = currentItem.itemCount;
      });
    return count;
  }
}
