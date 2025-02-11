export interface UserLogin {
  success: string;
  data: Data;
}

export interface Data {
  customer_id: number;
  type_person: string;
  firstname: string;
  lastname: string;
  email: string;
  sex: string;
  telephone: string;
  cellphone: string;
  cpf_cnpj: string;
  rg_ie: string;
  address_id: number;
  address: Address[];
}

export interface Address {
  address_id: number;
  firstname: string;
  lastname: string;
  address_1: string;
  address_2: string;
  number_home: string;
  neighborhood: string;
  city: string;
  postcode: string;
  country_id: number;
  zone_id: number;
}
