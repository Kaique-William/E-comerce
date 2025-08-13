"use client"
import Link from "next/link";

export default function ClienteFuncoes() {
  return (
    <div className="bg-black text-white hidden md:flex flex-wrap justify-center gap-2 lg:gap-4 py-2 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
      <Link
        href="/conta_cliente"
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Conta Cliente
      </Link>
      <Link
        href="/carrinho"
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Carrinho
      </Link>
      <Link
        href="/compras"
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Compras
      </Link>
    </div>
  );
}
