"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Produto {
    id_produto: number;
    nome: string;
    valor: number;
    quantidade: number;
    quantidade_minima: number;
    categoria?: string;
    tipo?: string;
    color?: string;
    marca?: string;
    tamanho?: string;
    descricao?: string;
}

interface Imagem {
    id: number;
    produto_id: number;
    name: string;
    tipo: string;
    base64: string;
}

export default function DetalhesProduto() {
    const params = useParams();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [imagens, setImagens] = useState<Imagem[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                setCarregando(true);
                setErro(null);

                // Buscar dados do produto
                const produtoResponse = await fetch(`/api/produtos/${params.id}`);
                if (!produtoResponse.ok) {
                    throw new Error('Produto não encontrado');
                }
                const produtoData = await produtoResponse.json();
                setProduto(produtoData);

                // Buscar imagens do produto
                try {
                    const imagensResponse = await fetch(`/api/imagem?idP=${params.id}`);
                    if (imagensResponse.ok) {
                        const imagensData = await imagensResponse.json();
                        setImagens(imagensData);
                    }
                } catch {
                    console.log('Nenhuma imagem encontrada para este produto');
                }

            } catch (error) {
                setErro(error instanceof Error ? error.message : 'Erro ao carregar produto');
            } finally {
                setCarregando(false);
            }
        };

        if (params.id) {
            fetchProduto();
        }
    }, [params.id]);

    if (carregando) {
        return (
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Carregando produto...</p>
                </div>
            </main>
        );
    }

    if (erro || !produto) {
        return (
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
                    <p className="text-gray-600 mb-6">{erro || 'O produto solicitado não existe.'}</p>
                    <Link
                        href="/itens"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
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
                        Voltar aos produtos
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header da página */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{produto.nome}</h1>
                    <Link
                        href="/itens"
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Seção de imagens */}
                <div className="space-y-4">
                    {imagens.length > 0 ? (
                        <>
                            {/* Imagem principal */}
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                                <Image
                                    src={`data:${imagens[0].tipo};base64,${imagens[0].base64}`}
                                    alt={produto.nome}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Miniaturas */}
                            {imagens.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {imagens.slice(1).map((imagem) => (
                                        <div key={imagem.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                                            <Image
                                                src={`data:${imagem.tipo};base64,${imagem.base64}`}
                                                alt={produto.nome}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 mx-auto mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p>Nenhuma imagem disponível</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Seção de informações */}
                <div className="space-y-6">
                    {/* Preço */}
                    <div>
                        <h2 className="text-3xl font-bold text-green-600 mb-2">
                            R$ {produto.valor.toFixed(2)}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {produto.quantidade > 0 ? 'Em estoque' : 'Fora de estoque'}
                        </p>
                    </div>

                    {/* Informações básicas */}
                    <div className="space-y-3">
                        <div>
                            <h3 className="font-semibold text-gray-900">Quantidade disponível:</h3>
                            <p className="text-gray-600">{produto.quantidade} unidades</p>
                        </div>

                        {produto.categoria && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Categoria:</h3>
                                <p className="text-gray-600">{produto.categoria}</p>
                            </div>
                        )}

                        {produto.tipo && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Tipo:</h3>
                                <p className="text-gray-600">{produto.tipo}</p>
                            </div>
                        )}

                        {produto.marca && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Marca:</h3>
                                <p className="text-gray-600">{produto.marca}</p>
                            </div>
                        )}

                        {produto.color && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Cor:</h3>
                                <p className="text-gray-600">{produto.color}</p>
                            </div>
                        )}

                        {produto.tamanho && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Tamanho:</h3>
                                <p className="text-gray-600">{produto.tamanho}</p>
                            </div>
                        )}
                    </div>

                    {/* Descrição */}
                    {produto.descricao && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Descrição:</h3>
                            <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>
                        </div>
                    )}

                    {/* Botões de ação */}
                    <div className="flex gap-4 pt-6">
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={produto.quantidade === 0}
                        >
                            {produto.quantidade > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
