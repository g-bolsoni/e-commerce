"use client";

import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden text-black bg-transparent">
      <div className="flex w-full max-w-4xl items-center justify-between py-40 ">
        {/* 404 Text */}
        <div className="text-left max-w-md">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl mt-2">Perdido no espaço</p>
          <p className="mt-4 text-gray-600">A página que você procura não existe.</p>
          <a href="/" className="mt-6 flex justify-center items-center min-w-40 h-10 bg-black w-max text-secondary-200 px-6 py-2 transition-all duration-300 ease-linear rounded-lg border border-black hover:bg-transparent hover:border hover:text-black">
            Voltar a página inicial
          </a>
        </div>

        {/* Draggable Astronaut */}
        <div className="relative">
          <Image src="/images/astronaut.avif" alt="Astronaut" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
