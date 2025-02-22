import { IProductList } from "@/types/product_list";
import mongoose, { Schema } from "mongoose";

// Schema para ProductDescription
const ProductDescriptionSchema: Schema = new Schema({
  language_id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  meta_title: { type: String, required: true },
  meta_description: { type: String, required: true },
  meta_keyword: { type: String, required: true },
  description_resume: { type: String, required: true },
});

// Schema para ProductOptionValue
const ProductOptionValueSchema: Schema = new Schema({
  option_value_id: { type: Number, required: true },
  product_option_value_id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  subtract: { type: Number, required: true },
  price: { type: String, required: true },
  price_prefix: { type: String, required: true },
  weight: { type: String, required: true },
  weight_prefix: { type: String, required: true },
  reference: { type: String, required: true },
  external_reference: { type: String, required: true },
  name: { type: String, required: true },
});

// Schema para ProductOption
const ProductOptionSchema: Schema = new Schema({
  product_option_id: { type: Number, required: true },
  option_id: { type: Number, required: true },
  principal: { type: Number, required: true },
  type: { type: String, required: true },
  required: { type: Number, required: true },
  name: { type: String, required: true },
  product_option_value: { type: [ProductOptionValueSchema], required: true },
});

// Schema para Product
const ProductSchema: Schema = new Schema(
  {
    product_id: { type: Number, required: true },
    model: { type: String, required: true },
    external_reference: { type: String, required: true },
    stock_status_id: { type: Number, required: true },
    image: { type: String, required: true },
    manufacturer_id: { type: Number, required: true },
    price: { type: String, required: true },
    cost_price: { type: String, required: true },
    price_sale: { type: String, required: true },
    price_pos: { type: String, required: true }, // Ajustado para price_pos
    weight: { type: String, required: true },
    weight_class_id: { type: Number, required: true },
    length: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true },
    sku: { type: String, required: true },
    send_to_pos: { type: Number, required: true },
    status: { type: Number, required: true },
    date_added: { type: Date, required: true },
    date_modified: { type: Date, required: true },
    user_log: { type: String, required: true },
    product_description: { type: [ProductDescriptionSchema], required: true },
    product_to_category: { type: Array, required: true }, // Pode ser tipado como { category_id: number; name: string }[]
    product_special: { type: Array, required: true },
    product_discount: { type: Array, required: true },
    product_option: { type: [ProductOptionSchema], required: true },
    product_image: { type: Array, required: true }, // Pode ser tipado como { image: string }[]
    ncm: { type: String, default: null },
    seller: { type: String, default: null },
    url: { type: String, required: true },
    minimum: { type: Number, required: true },
    multiple_sales_quantity: { type: Number, required: true },
    approval_certificate: { type: String, required: true },
  },
  { collection: "productList" }
);

const ProductListSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    products: { type: [ProductSchema], required: true },
  },
  { collection: "productLists" }
);

// Exportação dos modelos
export default mongoose.models.ProductList || mongoose.model<IProductList>("ProductList", ProductListSchema);
