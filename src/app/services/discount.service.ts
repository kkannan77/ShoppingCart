import { Injectable } from "@angular/core";
import { Discount } from "../models/Discount";
import { Shoppingcart } from "../models/Shoppingcart";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DiscountService {
  discountList: Discount[];
  private discountAmount = new BehaviorSubject<number>(0);
  discountPrice = this.discountAmount.asObservable();
  private discountCoupon = new BehaviorSubject<string>("");
  appliedCoupon = this.discountCoupon.asObservable();
  couponApplied: boolean = false;
  test: Shoppingcart;
  previousDiscount: number = 0;
  prevDiscountAmount: number = 0;
  prevDiscountCoupon: string = "";
  currentDiscount: Discount;
  totalDiscountedPrice: number;

  constructor() {
    this.discountList = [
      {
        promoCode: "RRD4D32",
        discountType: "*",
        billAmount: 1000,
        discountPercentage: 10
      },
      {
        promoCode: "44F4T11",
        discountType: "*",
        billAmount: 1500,
        discountPercentage: 15
      },
      {
        promoCode: "FF9543D1",
        discountType: "-",
        criteriaItem: "docgen",
        numberofItems: 10,
        targetdiscountItem: "docgen",
        discountPrice: 8.99,
        priority: 2
      },
      {
        promoCode: "YYGWKJD",
        discountType: "-",
        criteriaItem: "wf",
        numberofItems: 1,
        targetdiscountItem: "form",
        discountPrice: 89.99,
        priority: 1
      }
    ];
  }

  generateDiscount(totalPrice: number, cart: Shoppingcart[]): number {
    let minimumAmount: number = 0;
    let discountList: Discount[];
    let discountCode: Discount;
    let discountPercent: number = 0;
    let discountedAmount: number = 0;
    let discountPerItem: number = 0;
    let targetDiscountItem: string;
    let numberofCartItems: number;
    let index: number;
    let targetCartItem: Shoppingcart;
    let totalCost = 0;

    minimumAmount = this.getLowestTotalDiscountAmount();
    if (totalPrice > minimumAmount) {
      discountList = this.filterListOnDiscountType("*");
      discountList.forEach((currentDiscountItem, currentIndex) => {
        if (totalPrice >= currentDiscountItem.billAmount) {
          discountCode = currentDiscountItem;
        }
      });

      discountPercent = discountCode.discountPercentage / 100;
      discountedAmount = totalPrice * discountPercent;
      this.getDiscountAmount(discountedAmount);
      this.getDisCountCoupon(discountCode.promoCode);
      return totalPrice - discountedAmount;
    } else if (!(cart.length === 0)) {
      return this.getPerItemDiscount(totalPrice, cart);
    } else {
      this.clearState();
    }
  }

  getPerItemDiscount(totalPrice: number, cart: Shoppingcart[]): number {
    var previousCoupon: string;
    let discountList: Discount[];
    var minimumAmount: number = 0;
    var discountCode: Discount;
    var discountPercent: number = 0;
    var discountedAmount: number = 0;
    var discountPerItem: number = 0;
    var targetDiscountItem: string;
    var numberofCartItems: number;
    var index: number;
    var targetCartItem: Shoppingcart;
    var totalCost = 0;
    var here = false;
    discountList = this.filterListOnDiscountType("-");

    console.log(discountList);
    cart.filter(item => { });

    if (discountCode === undefined)
      discountList.forEach((currentDiscountItem, currentIndex) => {
        cart
          .filter(
            cartItem =>
              cartItem.item.productId === currentDiscountItem.criteriaItem
          )

          .forEach((currentCartItem, currentIndex) => {
            if (
              currentCartItem.itemCount >= currentDiscountItem.numberofItems
            ) {
              targetDiscountItem = currentDiscountItem.targetdiscountItem;
              discountPerItem = currentDiscountItem.discountPrice;

              discountCode = currentDiscountItem;

              cart
                .filter(item => item.item.productId === targetDiscountItem)
                .forEach((currentItem, currentIndex) => {
                  targetCartItem = currentItem;
                });
            }
          });
      });

    cart.forEach((currentItem, currentIndex) => {
      if (targetCartItem === currentItem) {
        discountedAmount = targetCartItem.itemCount * discountPerItem;

        totalCost = totalCost + discountedAmount;
      } else {
        totalCost = totalCost + currentItem.itemPrice;
      }
    });
    if (targetCartItem != undefined) {
      discountedAmount = targetCartItem.itemCount * discountPerItem;
      this.prevDiscountCoupon = discountCode.promoCode;
      this.getDiscountAmount(totalPrice - totalCost);
      this.getDisCountCoupon(discountCode.promoCode);

      targetCartItem = undefined;

      return totalCost;
    }
  }

  getLowestTotalDiscountAmount(): number {
    let minimumAmount: number = 0;
    let percentDiscountList: Discount[];
    percentDiscountList = this.filterListOnDiscountType("*");
    minimumAmount = percentDiscountList.reduce(
      (min, discountItem) =>
        discountItem.billAmount < min ? discountItem.billAmount : min,
      this.discountList[0].billAmount
    );
    return minimumAmount;
  }

  filterListOnDiscountType(discountType: string): Discount[] {
    return this.discountList.filter(
      discountItem => discountItem.discountType === discountType
    );
  }

  getDiscountAmount(discountAmount: number) {
    this.prevDiscountAmount = discountAmount;
    this.discountAmount.next(discountAmount);
  }

  getDisCountCoupon(discountCoupon: string) {
    this.prevDiscountCoupon = discountCoupon;
    this.discountCoupon.next(discountCoupon);
  }
  clearState() {
    this.discountAmount.next(0);
    this.discountCoupon.next("");
    this.currentDiscount === undefined;
  }
}
