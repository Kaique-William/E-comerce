import Link from "next/link";

export default function LinhaFuncoes() {
  return (
    <div className="bg-black text-white flex justify-between py-2 px-30 w-full">
      <Link
        href={"/conta_cliente"}
        className="w-40 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Conta Cliente
      </Link>
      <Link
        href={"/carrinho"}
        className="w-40 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Carrinho
      </Link>
      <Link
        href={"/compras"}
        className="w-40 h-7 flex items-center justify-center hover:border-b-2 border-red-700 "
      >
        Compras
      </Link>
    </div>
  );
}
