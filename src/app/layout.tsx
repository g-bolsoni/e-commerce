import { Poppins } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { Suspense } from "react";

import "./globals.css";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import CartProviderWrapper from "./CartProviderWrapper";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// Skeleton do Header para loading
function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden lg:block bg-gray-900 h-9" />
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 lg:h-[72px] items-center gap-4">
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:flex flex-1 justify-center gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="flex-1 lg:hidden" />
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

interface IChildren {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <CartProviderWrapper>
            <Suspense fallback={<HeaderSkeleton />}>
              <Header />
            </Suspense>
            <main className="overflow-x-hidden">
              {children}
              <div className="newsletter mx-3 md:container md:mx-auto">
                <Newsletter />
              </div>
            </main>
            <ToastContainer
              stacked
              limit={2}
              position="top-right"
              autoClose={3500}
              closeOnClick
              draggable
              pauseOnHover
              style={{ width: "100vw", maxWidth: 400 }}
              toastStyle={{ fontSize: 14, minHeight: 40, borderRadius: 10 }}
            />
            <Footer />
          </CartProviderWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
