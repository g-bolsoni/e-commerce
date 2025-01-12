"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { ToastContainer } from 'react-toastify';

import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Header from '@/components/Header';
import { CartProvider } from '@/hooks/useCart';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  )
}
