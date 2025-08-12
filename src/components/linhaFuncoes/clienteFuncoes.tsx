"use client"
import Link from "next/link";

export default function ClienteFuncoes() {
  return (
    <div className="bg-black text-white flex justify-between py-2 px-20 w-full">
      <Link
        href="/conta_cliente"
        className="w-32 h-7 flex items-center justify-center hover:border-b-2 border-red-700"
      >
        Conta Cliente
      </Link>
      <Link
        href="/carrinho"
        className="w-20 h-7 flex items-center justify-center hover:border-b-2 border-red-700"
      >
        Carrinho
      </Link>
      <Link
        href="/compras"
        className="w-24 h-7 flex items-center justify-center hover:border-b-2 border-red-700"
      >
        Compras
      </Link>
    </div>
  );
}
