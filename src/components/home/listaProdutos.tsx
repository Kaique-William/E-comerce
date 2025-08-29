"use client"

import { useState, useEffect } from "react";

interface Produto {
    id_produto: number;
    nome: string;
    valor: number;
    quantidade: number;
    categoria: string;
    tipo: string;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(true);

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

    return (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {carregando ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Carregando produtos...</p>
                    </div>
                ) : produtos.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
                    </div>
                ) : (
                    produtos.map((produto) => (
                        <div
                            key={produto.id_produto}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4 sm:p-6"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
                                {produto.nome}
                            </h2>
                            <p className="text-base sm:text-lg text-green-600 font-bold mb-1">
                                R$ {produto.valor.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                Quantidade: {produto.quantidade}
                            </p>
                            {produto.categoria && (
                                <p className="text-xs text-gray-500">
                                    {produto.categoria} • {produto.tipo}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}