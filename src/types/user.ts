export interface UserLogin {
  success: string;
  data: IUser;
}

export interface IUser {
  type_person: "F" | "J";
  firstname: string;
  lastname: string;
  email: string;
  cpf_cnpj: string;
  rg_ie?: string;
  birthday: string;
  sex: "M" | "F";
  cellphone: string;
  telephone?: string;
  status: "1" | "0";
  customer_attacked?: "1" | "0";
  limit_credit?: number;
  password: string;
  address?: {
    firstname?: string;
    address_1: string;
    number_home: string;
    neighborhood: string;
    city: string;
    postcode: string;
    zone_id: string;
  };
}
