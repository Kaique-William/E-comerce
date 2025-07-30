import Link from "next/link";


export default function LinhaFuncoes() {
  return (
    <div className="bg-black text-white flex justify-between py-2 px-30 w-full">
      <Link href={"/conta_cliente"} className="w-40 text-center hover:bg-gray-700 rounded">
        Conta Cliente
      </Link>
      <Link href={"/compras"} className="w-40 text-center hover:bg-gray-700 rounded">
        Compras
      </Link>
      <Link href={"/carrinho"} className="w-40 text-center hover:border-b-2 border-gray-700 rounded">
        Carrinho
      </Link>
    </div>
  );
}