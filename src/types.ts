export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export interface Stock {
  id: number;
  amount: number;
}

export interface GetToken {
  success: string;
  data: {
    authorization: string;
    date_expire: string;
  };
}
