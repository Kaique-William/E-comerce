"use client"

import { useState, useEffect } from "react";
import { useFiltro } from "@/contexts/FiltroContext";

interface Produto {
    id_produto: number;
    nome: string;
    valor: number;
    quantidade: number;
    categoria?: string;
    tipo?: string;
    descricao?: string;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const [carregando, setCarregando] = useState(true);
    const { categoriaSelecionada, tipoSelecionado, termoBusca, limparFiltros } = useFiltro();

    useEffect(() => {
        const fetchData = async () => {
            setCarregando(true);

            // Construir parâmetros de query
            const params = new URLSearchParams();
            if (categoriaSelecionada) {
                params.append('categoria', categoriaSelecionada);
            }
            if (tipoSelecionado) {
                params.append('tipo', tipoSelecionado);
            }
            if (termoBusca.trim()) {
                params.append('busca', termoBusca.trim());
            }

            const url = `/api/produtos${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);
            const data = await response.json();
            setProdutos(data);
            setCarregando(false);
        };
        fetchData();
    }, [categoriaSelecionada, tipoSelecionado, termoBusca]);

    // console.log(produtos);

    // Verificar se há filtros ativos
    const temFiltrosAtivos = categoriaSelecionada || tipoSelecionado || termoBusca.trim();

    return (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Seção de filtros ativos */}
            {temFiltrosAtivos && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Filtros ativos:</span>
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

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {carregando ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Carregando produtos...</p>
                    </div>
                ) : produtos.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {temFiltrosAtivos
                                ? "Nenhum produto encontrado com os filtros aplicados"
                                : "Nenhum produto encontrado"
                            }
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
                        <div
                            key={produto.id_produto}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4 sm:p-6 cursor-pointer"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
                                {produto.nome}
                            </h2>
                            <p className="text-base sm:text-lg text-green-600 font-bold mb-1">
                                R$ {produto.valor.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                                Quantidade: {produto.quantidade}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}