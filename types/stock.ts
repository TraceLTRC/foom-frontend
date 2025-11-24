import { Product } from "./product";
import { Warehouse } from "./warehouse";

export interface Stock {
  quantity: number,
  warehouse: Warehouse,
  product: Product
}
