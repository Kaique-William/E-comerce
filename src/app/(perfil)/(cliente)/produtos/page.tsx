"use client"

import { useState, useEffect, useMemo } from "react";
import { useFiltro } from "@/contexts/FiltroContext";
import Link from "next/link";

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

export default function ProdutosCliente() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <nav className="mb-4">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-blue-600">Home</Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium">Produtos</li>
                        </ol>
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Produtos</h1>
                    <p className="text-gray-600">Descubra nossa coleção completa de produtos</p>
                </div>

                {/* Filtros ativos */}
                {(categoriaSelecionada || tipoSelecionado || termoBusca.trim()) && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            Filtros ativos:
                            {categoriaSelecionada && <span className="font-semibold ml-1">{categoriaSelecionada}</span>}
                            {tipoSelecionado && <span className="font-semibold ml-1">• {tipoSelecionado}</span>}
                            {termoBusca.trim() && <span className="font-semibold ml-1">• {termoBusca}</span>}
                        </p>
                    </div>
                )}

                {/* Grid de produtos */}
                {carregando ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {produtosFiltrados.map((produto) => (
                            <Link
                                key={produto.id_produto}
                                href={`/produtos/${produto.id_produto}`}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 p-4 sm:p-6 cursor-pointer block group"
                            >
                                {/* Imagem placeholder */}
                                <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-xs">Imagem</p>
                                    </div>
                                </div>

                                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
                                    {produto.nome}
                                </h2>

                                <p className="text-xl text-green-600 font-bold mb-2">
                                    R$ {produto.valor.toFixed(2)}
                                </p>

                                {produto.categoria && (
                                    <p className="text-sm text-gray-500 mb-1">
                                        {produto.categoria} • {produto.tipo}
                                        {produto.marca && ` • ${produto.marca}`}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-3">
                                    <span className={`text-sm px-2 py-1 rounded-full ${produto.quantidade > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {produto.quantidade > 0 ? 'Em estoque' : 'Sem estoque'}
                                    </span>

                                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                                        Ver detalhes →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Botão voltar */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
