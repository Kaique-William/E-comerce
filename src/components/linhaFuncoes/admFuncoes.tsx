import Link from "next/link";

export default function AdmFuncoes() {
  return (
    <div className="bg-black text-white hidden md:flex flex-wrap justify-center gap-2 lg:gap-4 py-2 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
      <Link
        href={"/vendas"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Vendas
      </Link>
      <Link
        href={"/produtos"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Produtos
      </Link>
      <Link
        href={"/historico_vendas"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Historico de vendas
      </Link>
      <Link
        href={"/historico_compras"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Historico de compras
      </Link>
      <Link
        href={"/promocoes"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        Promocoes
      </Link>
      <Link
        href={"/fatura_despe"}
        className="px-2 py-1 text-xs sm:text-sm md:text-base flex items-center justify-center hover:border-b-2 border-red-700 whitespace-nowrap transition-colors"
      >
        faturamento e despesas
      </Link>
    </div>
  );
}
