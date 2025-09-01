"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Produto {
    id_produto: number;
    nome: string;
    valor: number;
    quantidade: number;
    quantidade_minima: number;
    data_ultima_remeca: string;
    quantidade_ultima_remeca: number;
    categoria: string;
    tipo: string;
    color: string;
    marca: string;
    tamanho: string;
    descricao: string;
}

export default function ProdutoDetalhes() {
    const params = useParams();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            if (!params.id) return;

            try {
                setCarregando(true);
                const response = await fetch(`/api/produtos/${params.id}`);

                if (!response.ok) {
                    throw new Error("Produto não encontrado");
                }

                const data = await response.json();
                setProduto(data);
            } catch (error) {
                setErro(error instanceof Error ? error.message : "Erro ao carregar produto");
            } finally {
                setCarregando(false);
            }
        };

        fetchProduto();
    }, [params.id]);

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (erro || !produto) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
                    <p className="text-gray-600 mb-6">{erro || "Produto não encontrado"}</p>
                    <Link
                        href="/"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Voltar para Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-blue-600">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/produtos" className="hover:text-blue-600">Produtos</Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium">{produto.nome}</li>
                    </ol>
                </nav>

                {/* Produto */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Imagem do produto (placeholder) */}
                        <div className="md:w-1/2 bg-gray-200 flex items-center justify-center p-8">
                            <div className="text-center text-gray-500">
                                <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                <p>Imagem do produto</p>
                            </div>
                        </div>

                        {/* Informações do produto */}
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{produto.nome}</h1>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-green-600">
                                    R$ {produto.valor.toFixed(2)}
                                </span>
                            </div>

                            {/* Detalhes do produto */}
                            <div className="space-y-4 mb-8">
                                {produto.categoria && (
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-24">Categoria:</span>
                                        <span className="font-medium">{produto.categoria}</span>
                                    </div>
                                )}

                                {produto.tipo && (
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-24">Tipo:</span>
                                        <span className="font-medium">{produto.tipo}</span>
                                    </div>
                                )}

                                {produto.marca && (
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-24">Marca:</span>
                                        <span className="font-medium">{produto.marca}</span>
                                    </div>
                                )}

                                {produto.tamanho && (
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-24">Tamanho:</span>
                                        <span className="font-medium">{produto.tamanho}</span>
                                    </div>
                                )}

                                {produto.color && (
                                    <div className="flex items-center">
                                        <span className="text-gray-600 w-24">Cor:</span>
                                        <span className="font-medium">{produto.color}</span>
                                    </div>
                                )}

                                <div className="flex items-center">
                                    <span className="text-gray-600 w-24">Estoque:</span>
                                    <span className={`font-medium ${produto.quantidade > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {produto.quantidade > 0 ? `${produto.quantidade} unidades` : 'Sem estoque'}
                                    </span>
                                </div>
                            </div>

                            {/* Descrição */}
                            {produto.descricao && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                                    <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>
                                </div>
                            )}

                            {/* Botões de ação */}
                            <div className="flex space-x-4">
                                {produto.quantidade > 0 ? (
                                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Adicionar ao Carrinho
                                    </button>
                                ) : (
                                    <button className="flex-1 bg-gray-400 text-white py-3 px-6 rounded-lg cursor-not-allowed font-medium">
                                        Produto Indisponível
                                    </button>
                                )}

                                <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                    Favoritar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão voltar */}
                <div className="mt-8 text-center">
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
