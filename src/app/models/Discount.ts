export interface Discount {
  promoCode: string;
  //   Either * for off and - for subtraction
  discountType: string;
  billAmount?: number;
  discountPercentage?: number;
  criteriaItem?: string;
  numberofItems?: number;
  targetdiscountItem?: string;
  discountPrice?: number;
  priority?: number;
}
