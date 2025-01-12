export interface ICategories {
  success: string;
  pagination: Pagination;
  data: CategoryInfo[];
}

export interface Pagination {
  currentPage: number;
  previousPageUrl: any;
  nextPageUrl: any;
  firstItem: number;
  lastItem: number;
}

export interface CategoryInfo {
  category_id: number;
  top: number;
  image?: string;
  image_icon: string;
  reference: string;
  parent_id: number;
  parent_id_reference: string;
  sort_order: number;
  status: number;
  date_added: string;
  category_description: CategoryDescription[];
}

export interface CategoryDescription {
  language_id: number;
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
}
