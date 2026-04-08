import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountNav from "../AccountNav";
import OrdersContent from "./OrdersContent";

export default async function MeusPedidosPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="md:container md:mx-auto mx-3 mt-6 mb-10">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-lg p-4 sticky top-6">
            <AccountNav />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="md:hidden mb-4">
            <AccountNav />
          </div>

          <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
            Meus Pedidos
          </h1>

          <OrdersContent />
        </main>
      </div>
    </div>
  );
}
