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
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [produtoEditado, setProdutoEditado] = useState<Produto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/produtos/api");
      const data = await response.json();
      setProdutos(data);
    };
    fetchData();
  }, []);

  const handleEditar = (produto: Produto) => {
    setEditandoId(produto.id_produto);
    setProdutoEditado({ ...produto });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setProdutoEditado(null);
  };

  const handleConfirmar = async () => {
    if (!produtoEditado) return;

    const response = await fetch(`/produtos/api`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoEditado),
    });

    if (response.ok) {
      setProdutos((prev) =>
        prev.map((p) =>
          p.id_produto === produtoEditado.id_produto ? produtoEditado : p
        )
      );
      setEditandoId(null);
      setProdutoEditado(null);
    } else {
      alert("Erro ao atualizar o produto");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!produtoEditado) return;
    const { name, value } = e.target;
    setProdutoEditado({ ...produtoEditado, [name]: value });
  };

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <aside className="w-2xs flex flex-col items-center justify-center bg-gray-500">
        <h1 className="text-white text-3xl">categorias</h1>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center">
        <div className="w-[96%] flex flex-col items-center">
          {produtos.map((item) => {
            const isEditando = editandoId === item.id_produto;

            return (
              <div
                key={item.id_produto}
                className="flex items-center w-full py-6 gap-7 border-b"
              >
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
                  foto do item
                </div>

                <div className="w-full">
                  <div className="flex justify-between w-full">
                    {isEditando ? (
                      <>
                        <input
                          name="nome"
                          value={produtoEditado?.nome || ""}
                          onChange={handleChange}
                          className="border px-2"
                        />
                        <input
                          name="data_ultima_remeca"
                          value={produtoEditado?.data_ultima_remeca || ""}
                          onChange={handleChange}
                          className="border px-2"
                          type="date"
                        />
                        <input
                          name="valor"
                          value={produtoEditado?.valor || ""}
                          onChange={handleChange}
                          className="border px-2 w-40"
                          type="number"
                        />
                      </>
                    ) : (
                      <>
                        <h1>{item.nome}</h1>
                        <h1>{item.data_ultima_remeca}</h1>
                        <h1>R${item.valor}</h1>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {isEditando ? (
                      <>
                        <input
                          name="quantidade"
                          value={produtoEditado?.quantidade || ""}
                          onChange={handleChange}
                          className="border px-2 w-20"
                          type="number"
                        />
                        <input
                          name="quantidade_minima"
                          value={produtoEditado?.quantidade_minima || ""}
                          onChange={handleChange}
                          className="border px-2 w-20"
                          type="number"
                        />
                        <input
                          name="quantidade_ultima_remeca"
                          value={produtoEditado?.quantidade_ultima_remeca || ""}
                          onChange={handleChange}
                          className="border px-2 w-20"
                          type="number"
                        />
                      </>
                    ) : (
                      <>
                        <h1>{item.quantidade}</h1>
                        <h1>{item.quantidade_minima}</h1>
                        <h1>{item.quantidade_ultima_remeca}</h1>
                      </>
                    )}
                  </div>
                </div>

                {isEditando ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleConfirmar}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      confirmar
                    </button>
                    <button
                      onClick={handleCancelar}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditar(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    editar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Link href="/produtos/adicionar">
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
          adicionar
        </button>
      </Link>
    </div>
  );
}
