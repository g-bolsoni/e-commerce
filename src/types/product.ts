export interface Product {
  data: Data;
  status: number;
  statusText: string;
}

export interface Data {
  success: string;
  pagination: Pagination;
  data: ProductInfo[];
}

export interface Pagination {
  currentPage: number;
  previousPageUrl: any;
  nextPageUrl: any;
  firstItem: number;
  lastItem: number;
}

export interface ProductInfo {
  product_id: number;
  model: string;
  external_reference?: string;
  stock_status_id: number;
  image: string;
  manufacturer_id: number;
  price: string;
  cost_price: string;
  price_sale: string;
  price_pos: string;
  weight: string;
  weight_class_id: number;
  length: string;
  width: string;
  height: string;
  sku: string;
  send_to_pos: number;
  status: number;
  date_added: string;
  date_modified: string;
  user_log: string;
  product_description: ProductDescription[];
  product_to_category: ProductToCategory[];
  product_special: ProductSpecial[];
  product_discount: any[];
  product_option: ProductOption[];
  product_image: ProductImage[];
  ncm: any;
  seller: any;
  url: string;
  minimum: number;
  multiple_sales_quantity: number;
  approval_certificate?: string;
}

export interface ProductDescription {
  language_id: number;
  name: string;
  description: string;
  description_resume: string;
  tag: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
}

export interface ProductToCategory {
  category_id: number;
  name: string;
}

export interface ProductSpecial {
  customer_group_id: number;
  priority: number;
  payment_select: string;
  price: string;
  date_start: string;
  date_end: string;
  price_type: number;
  price_discount: string;
  quantity: number;
}

export interface ProductOption {
  product_option_id: number;
  option_id: number;
  required: number;
  principal: number;
  grid_stock: number;
  calculation_simulator: number;
  package_name?: string;
  name: string;
  product_option_value: ProductOptionValue[];
}

export interface ProductOptionValue {
  product_option_value_id: number;
  product_id: number;
  option_value_id: number;
  quantity: number;
  subtract: number;
  price: string;
  price_prefix: string;
  weight: string;
  weight_prefix: string;
  stock_type: string;
  reference?: string;
  external_reference: string;
  name?: string;
}

export interface ProductImage {
  image: string;
}
