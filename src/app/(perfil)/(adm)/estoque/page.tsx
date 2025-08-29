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
  color: string;
  marca: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  categoria: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [produtoEditado, setProdutoEditado] = useState<Produto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/estoque");
        let data = await response.json();
        if (data && typeof data === "object" && !Array.isArray(data)) {
          if (Array.isArray(data.produtos)) {
            data = data.produtos;
          } else {
            data = [];
          }
        }
        setProdutos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProdutos([]);
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
      const response = await fetch(`/api/estoque`, {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!produtoEditado) return;
    const { name, value } = e.target;
    if (
      [
        "valor",
        "quantidade",
        "quantidade_minima",
        "quantidade_ultima_remeca",
      ].includes(name)
    ) {
      setProdutoEditado({ ...produtoEditado, [name]: Number(value) });
    } else {
      setProdutoEditado({ ...produtoEditado, [name]: value });
    }
  };

  const handleDelete = async (id_produto: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`/api/estoque`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_produto }),
        });
        if (response.ok) {
          setProdutos((prev) =>
            prev.filter((p) => p.id_produto !== id_produto)
          );
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Produtos
          </h1>
          <Link href="/produtos/adicionar">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Adicionar Produto
            </button>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Produto",
                        "Marca",
                        "Tipo",
                        "Tamanho",
                        "Categoria",
                        "Cor",
                        "Valor",
                        "Qtd",
                        "Mínima",
                        "Ações",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 ">
                    {produtos.map((item) => {
                      const isEditando = editandoId === item.id_produto;
                      const inputClass =
                        "border px-2 py-1 rounded text-sm w-full max-w-[120px]";
                      const fields: (keyof Produto)[] = [
                        "nome",
                        "marca",
                        "tipo",
                        "tamanho",
                        "categoria",
                        "color",
                        "valor",
                        "quantidade",
                        "quantidade_minima",
                      ];

                      return (
                        <tr
                          key={item.id_produto}
                          className="hover:bg-gray-50 border-t border-black"
                        >
                          <td colSpan={10} className="px-4 py-4">
                            <div className="flex flex-col gap-2">
                              {/* Informações principais */}
                              <div className="grid grid-cols-10 gap-2">
                                {fields.map((field) => (
                                  <div key={field} className="text-sm">
                                    {isEditando ? (
                                      field === "tipo" ? (
                                        <select
                                          name={field}
                                          value={
                                            produtoEditado
                                              ? produtoEditado[field]
                                              : ""
                                          }
                                          onChange={handleChange}
                                          className={inputClass}
                                        >
                                          {[
                                            "Camisa",
                                            "Calça",
                                            "Calçados",
                                            "Vestido",
                                            "Saia",
                                            "Bermuda",
                                            "Jaqueta",
                                            "Blusa",
                                            "Shorts",
                                            "Intimo",
                                            "Outros",
                                          ].map((opt) => (
                                            <option key={opt}>{opt}</option>
                                          ))}
                                        </select>
                                      ) : field === "categoria" ? (
                                        <select
                                          name={field}
                                          value={
                                            produtoEditado
                                              ? produtoEditado[field]
                                              : ""
                                          }
                                          onChange={handleChange}
                                          className={inputClass}
                                        >
                                          {[
                                            "Masculino",
                                            "Feminino",
                                            "Unissex",
                                          ].map((opt) => (
                                            <option key={opt}>{opt}</option>
                                          ))}
                                        </select>
                                      ) : (
                                        <input
                                          name={field}
                                          type={
                                            [
                                              "valor",
                                              "quantidade",
                                              "quantidade_minima",
                                            ].includes(field)
                                              ? "number"
                                              : "text"
                                          }
                                          value={
                                            produtoEditado
                                              ? produtoEditado[field]
                                              : ""
                                          }
                                          onChange={handleChange}
                                          className={inputClass}
                                        />
                                      )
                                    ) : field === "valor" ? (
                                      `R$ ${item.valor.toFixed(2)}`
                                    ) : (
                                      item[field]
                                    )}
                                  </div>
                                ))}

                                {/* Ações */}
                                <div className="text-sm">
                                  {isEditando ? (
                                    <>
                                      <button
                                        onClick={handleConfirmar}
                                        className="text-green-600 hover:text-green-900 mx-4"
                                      >
                                        ✓
                                      </button>
                                      <button
                                        onClick={handleCancelar}
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        ✗
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleEditar(item)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                      >
                                        Editar
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDelete(item.id_produto)
                                        }
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Excluir
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Divisor e descrição */}
                              <div className="border-t border-gray-200 mt-2 pt-2">
                                <strong>Descrição:</strong>{" "}
                                {isEditando ? (
                                  <textarea
                                    name="descricao"
                                    value={produtoEditado?.descricao || ""}
                                    onChange={handleChange}
                                    className="border px-2 py-1 rounded text-sm w-full"
                                    rows={2}
                                  />
                                ) : (
                                  item.descricao || "Sem descrição"
                                )}
                              </div>
                            </div>
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
