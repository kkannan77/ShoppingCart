import { Injectable } from "@angular/core";
import { Item } from "../models/Item";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  items: Item[];
  itemData: Observable<Item[]>;

  constructor() {
    this.items = [
      {
        productId: "wf",
        productName: "Workflow",
        price: 199.99
      },
      {
        productId: "docgen",
        productName: "Document Generation",
        price: 9.99
      },
      {
        productId: "form",
        productName: "Form",
        price: 99.99
      }
    ];
  }

  getItems(): Observable<Item[]> {
    return of(this.items);
  }
}
