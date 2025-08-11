"use client"
import { useState, useEffect } from "react";

interface Produto {
  id_produto: number;
  nome: string;
  valor: number;
  quantidade: number;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/produtos/api");
            const data = await response.json();
            setProdutos(data);
        };
        fetchData();
    }, []);
    return (
        <main className="flex flex-wrap justify-center gap-2">
            {produtos.map ((produto) => (
                <div key={produto.id_produto} className=" border border-gray-300 p-4 mb-4">
                    <h2>{produto.nome}</h2>
                    <p>Valor: R$ {produto.valor}</p>
                    <p>Quantidade: {produto.quantidade}</p>
                </div>
            ))}
        </main>
    )
}