import { TokenProvider } from "@/hooks/TokenProvider";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";

import "./globals.css";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

interface IChildren {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TokenProvider>
            <div className="mx-3 md:container md:mx-auto overflow-x-hidden">
              <Header />
              {children}
              <Newsletter />
            </div>
            <Footer />
          </TokenProvider>
        </QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
