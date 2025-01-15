"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { ToastContainer } from "react-toastify";

import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/hooks/useCart";
import { useEffect } from "react";
import { tokenApi } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

interface IChildren {
  children: React.ReactNode;
}
interface ITokenApi {
  authorization: string;
  date_expire: string;
}
export default function RootLayout({ children }: IChildren) {
  useEffect(() => {
    const getApiToken = async () => {
      const { authorization, date_expire }: ITokenApi = await tokenApi();

      if (!authorization) return;

      console.log("chamou");

      localStorage.setItem("apiToken", authorization);
      localStorage.setItem("apiTokenExpiration", date_expire);
    };

    const apiTokenExpiration = localStorage.getItem("apiTokenExpiration");

    if (apiTokenExpiration) {
      const now = new Date();
      const expirationDate = new Date(apiTokenExpiration);

      if (now > expirationDate) {
        getApiToken();
      }
    } else {
      getApiToken();
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <div className={inter.className}>
              <div className="mx-3 md:container md:mx-auto overflow-x-hidden">
                <Header />
                {children}
                <Newsletter />
              </div>
              <Footer />
            </div>
            <ToastContainer autoClose={3000} />
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
