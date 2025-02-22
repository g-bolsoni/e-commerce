import { ProductInfo } from "./product";

export interface IProductList extends Document {
  name: string;
  status: string;
  products: ProductInfo[];
}
