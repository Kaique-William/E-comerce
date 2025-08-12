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
      try {
        const response = await fetch("/produtos/api");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
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

    try {
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
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar o produto");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!produtoEditado) return;
    const { name, value } = e.target;
    
    if (name === 'valor' || name === 'quantidade' || name === 'quantidade_minima' || name === 'quantidade_ultima_remeca') {
      setProdutoEditado({ ...produtoEditado, [name]: Number(value) });
    } else {
      setProdutoEditado({ ...produtoEditado, [name]: value });
    }
  };

  const handleDelete = async (id_produto: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`/produtos/api`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_produto }),
        });

        if (response.ok) {
          setProdutos((prev) => prev.filter((p) => p.id_produto !== id_produto));
        } else {
          alert("Erro ao excluir o produto");
        }
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir o produto");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Produtos</h1>
          <Link href="/produtos/adicionar">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Adicionar Produto
            </button>
          </Link>
        </div>

        {/* Sidebar responsivo */}
        <div className="mb-6 lg:hidden">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Categorias</h2>
            <p className="text-sm text-gray-600">Gerencie suas categorias de produtos</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Categorias</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors">
                  Todos os Produtos
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors">
                  Em Estoque
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors">
                  Baixo Estoque
                </button>
              </div>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Data Remeça
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Quantidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Mínima
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {produtos.map((item) => {
                      const isEditando = editandoId === item.id_produto;

                      return (
                        <tr key={item.id_produto} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-medium">
                                  {item.nome.charAt(0)}
                                </span>
                              </div>
                              <div>
                                {isEditando ? (
                                  <input
                                    name="nome"
                                    value={produtoEditado?.nome || ""}
                                    onChange={handleChange}
                                    className="border px-2 py-1 rounded text-sm"
                                  />
                                ) : (
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.nome}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            {isEditando ? (
                              <input
                                name="data_ultima_remeca"
                                value={produtoEditado?.data_ultima_remeca || ""}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded text-sm"
                                type="date"
                              />
                            ) : (
                              <div className="text-sm text-gray-900">
                                {new Date(item.data_ultima_remeca).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditando ? (
                              <input
                                name="valor"
                                value={produtoEditado?.valor || ""}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded text-sm w-20"
                                type="number"
                                step="0.01"
                              />
                            ) : (
                              <div className="text-sm text-gray-900">
                                R$ {item.valor.toFixed(2)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            {isEditando ? (
                              <input
                                name="quantidade"
                                value={produtoEditado?.quantidade || ""}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded text-sm w-16"
                                type="number"
                              />
                            ) : (
                              <div className="text-sm text-gray-900">
                                {item.quantidade}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                            {isEditando ? (
                              <input
                                name="quantidade_minima"
                                value={produtoEditado?.quantidade_minima || ""}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded text-sm w-16"
                                type="number"
                              />
                            ) : (
                              <div className="text-sm text-gray-900">
                                {item.quantidade_minima}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {isEditando ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={handleConfirmar}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={handleCancelar}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  ✗
                                </button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditar(item)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id_produto)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Excluir
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {produtos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum produto encontrado</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
