import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import AccountNav from "../AccountNav";
import EditProfileForm from "./EditProfileForm";

export default async function MeusDadosPage() {
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
            Meus Dados
          </h1>

          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-secondary-100">
              <Image
                src={session.user?.image || "/images/no_user_icon.avif"}
                alt="Foto de perfil"
                width={80}
                height={80}
                className="rounded-full w-16 h-16 md:w-20 md:h-20"
              />
              <div>
                <h2 className="text-base md:text-lg font-bold text-gray-800">
                  {session.user?.name}
                </h2>
                <p className="text-xs md:text-sm text-secondary-500">
                  {session.user?.email}
                </p>
              </div>
            </div>

            <EditProfileForm
              defaultName={session.user?.name || ""}
              defaultEmail={session.user?.email || ""}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
