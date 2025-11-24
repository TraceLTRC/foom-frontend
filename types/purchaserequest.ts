import { Product } from "./product";
import { Warehouse } from "./warehouse";

export const StatusEnum = {
    DRAFT: 0,
    PENDING: 1,
    COMPLETED: 2
} as const;
const reversedStatusEnum = Object.fromEntries(Object.entries(StatusEnum).map(x => [x[1], x[0]]));

export type Status = typeof StatusEnum[keyof typeof StatusEnum];

export const StatusToString = (status: Status) => {
  return reversedStatusEnum[status];
}

export interface PurchaseRequestItem {
  quantity: number,
  product: Product
}

export interface PurchaseRequest {
  id: number,
  reference: string,
  status: Status,
  warehouse: Warehouse,
  items: PurchaseRequestItem[]
}

export type PurchaseRequestSummary = Omit<PurchaseRequest, "items">

export type CreatePurchaseRequestDTO = {
  reference: string,
  warehouse_id: number,
  items: {
    product_id: number,
    quantity: number
  }[]
}

export type UpdatePurchaseRequestDTO = CreatePurchaseRequestDTO & {
  status: Status
}
