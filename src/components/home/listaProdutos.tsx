"use client"

import { useState, useEffect, useMemo } from "react";
import { useFiltro } from "@/contexts/FiltroContext";

interface Produto {
    id_produto: number;
    nome: string;
    valor: number;
    quantidade: number;
    categoria: string;
    tipo: string;
    marca?: string;
    id_imagem?: number;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [selecionado, setSelecionado] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const { categoriaSelecionada, tipoSelecionado, termoBusca } = useFiltro();

    useEffect(() => {
        const fetchData = async () => {
            setCarregando(true);
            try {
                const response = await fetch("/api/estoque");
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
                setProdutos([]);
            }
            setCarregando(false);
        };
        fetchData();
    }, []);

    const handleclick = (produto: Produto) => {
        setSelecionado(produto);
    }

    // Filtrar produtos baseado na categoria, tipo e termo de busca
    const produtosFiltrados = useMemo(() => {
        let filtrados = produtos;

        // Filtrar por categoria
        if (categoriaSelecionada) {
            filtrados = filtrados.filter(produto =>
                produto.categoria?.toLowerCase() === categoriaSelecionada.toLowerCase()
            );
        }

        // Filtrar por tipo
        if (tipoSelecionado) {
            filtrados = filtrados.filter(produto =>
                produto.tipo?.toLowerCase() === tipoSelecionado.toLowerCase()
            );
        }

        // Filtrar por termo de busca (nome, tipo, marca, categoria)
        if (termoBusca.trim()) {
            const termo = termoBusca.toLowerCase().trim();
            filtrados = filtrados.filter(produto => {
                const nome = produto.nome?.toLowerCase() || '';
                const tipo = produto.tipo?.toLowerCase() || '';
                const marca = produto.marca?.toLowerCase() || '';
                const categoria = produto.categoria?.toLowerCase() || '';

                return nome.includes(termo) ||
                    tipo.includes(termo) ||
                    marca.includes(termo) ||
                    categoria.includes(termo);
            });
        }

        return filtrados;
    }, [produtos, categoriaSelecionada, tipoSelecionado, termoBusca]);

    return (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mostrar filtros ativos */}
            {(categoriaSelecionada || tipoSelecionado || termoBusca.trim()) && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        Filtros ativos:
                        {categoriaSelecionada && <span className="font-semibold ml-1">{categoriaSelecionada}</span>}
                        {tipoSelecionado && <span className="font-semibold ml-1">• {tipoSelecionado}</span>}
                        {termoBusca.trim() && <span className="font-semibold ml-1">•{termoBusca}</span>}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {carregando ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Carregando produtos...</p>
                    </div>
                ) : produtosFiltrados.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {categoriaSelecionada || tipoSelecionado || termoBusca.trim()
                                ? "Nenhum produto encontrado com os filtros selecionados"
                                : "Nenhum produto encontrado"}
                        </p>
                    </div>
                ) : (
                    produtosFiltrados.map((produto) => (
                        <a
                            key={produto.id_produto}
                            href={`/produtos/${produto.id_produto}`}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4 sm:p-6 cursor-pointer block"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
                                {produto.nome}
                            </h2>
                            <p className="text-base sm:text-lg text-green-600 font-bold mb-1">
                                R$ {produto.valor.toFixed(2)}
                            </p>
                            {produto.categoria && (
                                <p className="text-xs text-gray-500">
                                    {produto.categoria} •  {produto.tipo}
                                    {produto.marca && ` • ${produto.marca}`}
                                </p>
                            )}
                        </a>
                    ))
                )}
            </div>
        </main>
    )
}