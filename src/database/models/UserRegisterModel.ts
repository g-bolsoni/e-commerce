import { IUser } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    type_person: { type: String, enum: ["F", "J"], required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf_cnpj: { type: String, required: true, unique: true },
    rg_ie: { type: String, required: false },
    birthday: { type: String, required: true },
    sex: { type: String, enum: ["M", "F"], required: true },
    cellphone: { type: String, required: true },
    telephone: { type: String, required: false },
    status: { type: String, enum: ["1", "0"], required: true },
    customer_attacked: { type: String, enum: ["1", "0"], required: false },
    limit_credit: { type: Number, required: false, min: 0 },
    password: { type: String, required: true },
    address: {
      type: {
        firstname: { type: String, required: true },
        address_1: { type: String, required: true },
        number_home: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        postcode: { type: String, required: true },
        zone_id: { type: String, required: true },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
