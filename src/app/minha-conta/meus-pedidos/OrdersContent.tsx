"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DummyCart, DummyCartProduct } from "@/types/dummyjson";
import { formatPrice } from "@/services/dummyjson";

type OrderStatus = "entregue" | "em_transporte" | "processando" | "cancelado";

interface OrderWithStatus extends DummyCart {
  status: OrderStatus;
  date: string;
  trackingCode: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  entregue: {
    label: "Entregue",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  em_transporte: {
    label: "Em Transporte",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  processando: {
    label: "Processando",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  cancelado: {
    label: "Cancelado",
    color: "text-red-700",
    bg: "bg-red-100",
  },
};

const statuses: OrderStatus[] = [
  "entregue",
  "em_transporte",
  "processando",
  "cancelado",
];

function generateMockDate(index: number): string {
  const now = new Date();
  now.setDate(now.getDate() - index * 7 - Math.floor(Math.random() * 10));
  return now.toLocaleDateString("pt-BR");
}

function generateTrackingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BR";
  for (let i = 0; i < 9; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function OrdersContent() {
  const [orders, setOrders] = useState<OrderWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("https://dummyjson.com/carts?limit=6");
        const data = await res.json();
        const enrichedOrders: OrderWithStatus[] = data.carts.map(
          (cart: DummyCart, index: number) => ({
            ...cart,
            status: statuses[index % statuses.length],
            date: generateMockDate(index),
            trackingCode: generateTrackingCode(),
          }),
        );
        setOrders(enrichedOrders);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-secondary-200 rounded w-1/3 mb-3" />
            <div className="h-3 bg-secondary-100 rounded w-1/2 mb-2" />
            <div className="h-3 bg-secondary-100 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg p-10 text-center">
        <p className="text-secondary-500 text-sm">
          Você ainda não realizou nenhum pedido.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-primary-500 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Explorar produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = statusConfig[order.status];
        const isExpanded = expandedOrder === order.id;

        return (
          <div key={order.id} className="bg-white rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              className="w-full p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-left hover:bg-secondary-50 transition-colors"
            >
              <div className="flex items-center justify-between md:contents">
                <span className="text-sm font-bold text-gray-800">
                  Pedido #{order.id.toString().padStart(5, "0")}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-secondary-500 md:ml-auto">
                <span>{order.date}</span>
                <span>{order.totalProducts} itens</span>
                <span className="font-bold text-sm text-gray-800">
                  {formatPrice(order.discountedTotal)}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-secondary-100 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 text-xs text-secondary-500">
                  <span>
                    Código de rastreio:{" "}
                    <strong className="text-gray-700">
                      {order.trackingCode}
                    </strong>
                  </span>
                </div>

                <div className="space-y-3">
                  {order.products.map((product: DummyCartProduct) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 md:gap-4"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/produto/${product.id}`}
                          className="text-sm font-medium text-gray-800 hover:text-primary-500 line-clamp-1 transition-colors"
                        >
                          {product.title}
                        </Link>
                        <p className="text-xs text-secondary-500">
                          Qtd: {product.quantity}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-gray-800 shrink-0">
                        {formatPrice(product.discountedTotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-secondary-100 flex justify-between items-center">
                  <span className="text-sm text-secondary-500">Total</span>
                  <span className="text-base font-bold text-gray-800">
                    {formatPrice(order.discountedTotal)}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
