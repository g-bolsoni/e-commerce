export interface IProductList {
  success: string;
  pagination: Pagination;
  data: ProductListInfo[];
}

export interface Pagination {
  currentPage: number;
  previousPageUrl: any;
  nextPageUrl: any;
  firstItem: number;
  lastItem: number;
}

export interface ProductListInfo {
  name: string;
  status: string;
  products: Product[];
}

export interface Product {
  product_id: number;
  model: string;
  image: string;
  manufacturer_id: number;
  price: string;
  cost_price: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  status: number;
  date_added: string;
  date_modified: string;
  user_log: string;
  url: string;
  approval_certificate: any;
  product_description: ProductDescription[];
  product_image: any[];
  product_special?: ProductSpecial[];
  product_discount: any[];
  product_option: ProductOption;
}

export interface ProductDescription {
  name: string;
  language_id: number;
  description: string;
  tag: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  description_resume: string;
}

export interface ProductSpecial {
  customer_group_id: number;
  priority: number;
  payment_select: string;
  price: string;
  date_start: string;
  date_end: string;
  price_discount: any;
  quantity: number;
  price_type: number;
}

export interface ProductOption {
  option_id: number;
  name: string;
  product_option_value: ProductOptionValue;
}

export interface ProductOptionValue {
  option_value_id: number;
  quantity: number;
  price: string;
  price_prefix: string;
  weight: string;
  weight_prefix: string;
  name: string;
}
