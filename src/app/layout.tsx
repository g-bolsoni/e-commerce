import { TokenProvider } from "@/hooks/TokenProvider";
import { Poppins } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";

import "./globals.css";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import connectDB from "@/database";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface IChildren {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IChildren) {
  await connectDB();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <TokenProvider>
            <Header />
            <main className="overflow-x-hidden">
              {children}
              <div className="newsletter mx-3 md:container md:mx-auto">
                <Newsletter />
              </div>
            </main>
            <Footer />
          </TokenProvider>
        </QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
