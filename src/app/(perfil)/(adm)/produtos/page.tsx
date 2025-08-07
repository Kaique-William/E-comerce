"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Produto {
  id_produto: number;
  nome: string;
  valor: number;
  quantidade: number;
  quantidade_minima: number;
  data_ultima_remeca: string;
  quantidade_ultima_remeca: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/produtos/api");
      const data = await response.json();
      // console.log(data);
      setProdutos(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar de categorias */}
      <aside className="w-2xs flex flex-col items-center justify-center bg-gray-500">
        <h1 className="text-white text-3xl">categorias</h1>
      </aside>
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center">
        {/* Lista de itens */}
        <div className="w-[96%] flex flex-col items-center">
          {produtos.map((item) => (
            <div
              key={item.id_produto}
              className="flex items-center w-full py-6 gap-7 border-b"
            >
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
                foto do item
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <h1>{item.nome}</h1>
                  <h1>codigo do item</h1>
                  <h1>R${item.valor}</h1>
                </div>
                <div className="flex items-center justify-between gap-4 mt-4">
                  <h1>{item.quantidade}</h1>
                  <h1>{item.quantidade_minima}</h1>
                  <h1>{item.data_ultima_remeca}</h1>
                  <h1>{item.quantidade_ultima_remeca}</h1>
                </div>
              </div>
              <Link href={`/produtos/editar?id=${item.id_produto}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  editar
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Link href="/produtos/adicionar">
        <button className="fixed bottom-4 right-4">adicionar</button>
      </Link>
    </div>
  );
}
