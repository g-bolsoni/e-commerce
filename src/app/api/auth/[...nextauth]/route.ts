import { api } from "@/services/api";
import { UserLogin } from "@/types/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "token", type: "text" },
      },

      async authorize(credentials) {
        if (!this.authorize) return null;

        const loginData = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await api.post<UserLogin>("/customer/login", loginData, {
          headers: {
            authorization: credentials?.token,
          },
        });

        if (res.data.success == "false") return null;

        const customer_info = res.data.data;

        return {
          id: customer_info.customer_id.toString(),
          name: customer_info.firstname,
          lastname: customer_info.lastname,
          cpf: customer_info.cpf_cnpj,
          cellphone: customer_info.cellphone,
          email: customer_info.email,
          sex: customer_info.sex,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        return false; // Return false to indicate a failed sign-in attempt
      }
    },
  },
});

export { handler as GET, handler as POST };
