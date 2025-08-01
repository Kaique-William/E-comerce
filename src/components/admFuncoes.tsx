import Link from "next/link";

export default function AdmFuncoes() {
  return (
    <div className="bg-black text-white flex justify-between py-2 px-20 w-full">
      <Link
        href={"/vendas"}
        className="w-18 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Vendas
      </Link>
      <Link
        href={"/produtos"}
        className="w-21 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Produtos
      </Link>
      <Link
        href={"/historico_vendas"}
        className="w-42 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Historico de vendas
      </Link>
      <Link
        href={"/historico_compras"}
        className="w-44 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Historico de compras
      </Link>
      <Link
        href={"/promocoes"}
        className="w-27 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Promocoes
      </Link>
      <Link
        href={"/fatura_despe"}
        className="w-50 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        faturamento e despesas
      </Link>
    </div>
  );
}
