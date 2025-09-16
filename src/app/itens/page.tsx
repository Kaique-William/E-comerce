"use client";

import { useState, useEffect } from "react";
import { useFiltro } from "@/contexts/FiltroContext";
import Link from "next/link";

interface Produto {
  id_produto: number;
  nome: string;
  valor: number;
  quantidade: number;
  categoria?: string;
  tipo?: string;
  descricao?: string;
}

export default function TodosItens() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { categoriaSelecionada, tipoSelecionado, termoBusca, limparFiltros } = useFiltro();

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);

      // Construir parâmetros de query
      const params = new URLSearchParams();
      if (categoriaSelecionada) {
        params.append("categoria", categoriaSelecionada);
      }
      if (tipoSelecionado) {
        params.append("tipo", tipoSelecionado);
      }
      if (termoBusca.trim()) {
        params.append("busca", termoBusca.trim());
      }

      const url = `/api/produtos${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setProdutos(data);
      setCarregando(false);
    };
    fetchData();
  }, [categoriaSelecionada, tipoSelecionado, termoBusca]);

  // Verificar se há filtros ativos
  const temFiltrosAtivos =
    categoriaSelecionada || tipoSelecionado || termoBusca.trim();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header da página */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Todos os Produtos
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar
          </Link>
        </div>

        <p className="text-gray-600">
          {carregando
            ? "Carregando..."
            : `${produtos.length} produto(s) encontrado(s)`}
        </p>
      </div>

      {/* Seção de filtros ativos */}
      {temFiltrosAtivos && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">
              Filtros ativos:
            </span>
            {categoriaSelecionada && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Categoria: {categoriaSelecionada}
              </span>
            )}
            {tipoSelecionado && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Tipo: {tipoSelecionado}
              </span>
            )}
            {termoBusca.trim() && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Busca: &quot;{termoBusca}&quot;
              </span>
            )}
          </div>
          <button
            onClick={limparFiltros}
            className="text-sm text-red-600 hover:text-red-800 underline cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {carregando ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {temFiltrosAtivos
                ? "Nenhum produto encontrado com os filtros aplicados"
                : "Nenhum produto encontrado"}
            </p>
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                Limpar filtros para ver todos os produtos
              </button>
            )}
          </div>
        ) : (
          produtos.map((produto) => (
            <Link
              key={produto.id_produto}
              href={`/itens/${produto.id_produto}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4 sm:p-6 cursor-pointer group"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
                {produto.nome}
              </h2>
              <p className="text-base sm:text-lg text-green-600 font-bold mb-1">
                R$ {produto.valor.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Quantidade: {produto.quantidade}
              </p>
              {produto.categoria && (
                <p className="text-xs text-gray-500">
                  {produto.categoria} {produto.tipo && `• ${produto.tipo}`}
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
