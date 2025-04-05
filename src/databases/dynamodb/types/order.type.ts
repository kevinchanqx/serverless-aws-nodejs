export type Order = OrderPrimaryKey & OrderNonNullishFields;

export type OrderPrimaryKey = {
  orderId: string;
};

export type OrderNonNullishFields = {
  orderAmount: number;
  orderName: string;
  contact: string;
};

export type OrderContactIndexPrimaryKey = {
  contact: string;
};
