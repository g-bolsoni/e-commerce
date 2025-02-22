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
  product_model: string;
  external_reference: string;
  stock_status_id: number;
  image: string;
  manufacturer_id: number;
  price: string;
  cost_price: string;
  price_sale: string;
  price_pos: string; // Alterado de price_pdv para price_pos conforme seu exemplo
  weight: string;
  weight_class_id: number;
  length: string;
  width: string;
  height: string;
  sku: string;
  send_to_pos: number;
  status: number;
  date_added: Date;
  date_modified: Date;
  user_log: string;
  product_description: ProductDescription[];
  product_to_category: any[]; // Pode ser tipado mais especificamente se desejar
  product_special: any[];
  product_discount: any[];
  product_option: ProductOption[];
  product_image: any[]; // Pode ser tipado como { image: string }[]
  ncm: string | null;
  seller: string | null;
  url: string;
  minimum: number;
  multiple_sales_quantity: number;
  approval_certificate: string;
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
