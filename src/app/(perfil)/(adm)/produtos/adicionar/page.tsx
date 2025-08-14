"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Adicionar() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [quantidade_minima, setQuantidade_minima] = useState("");
  const [quantidade_ultima_remeca, setQuantidade_ultima_remeca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataUltimaRemeca, setDataUltimaRemeca] = useState(
    new Date().toISOString().split("T")[0]
  );

   const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setNome("");
    setValor("");
    setQuantidade("");
    setQuantidade_minima("");
    setQuantidade_ultima_remeca("");
    setDataUltimaRemeca(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/produtos/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          valor: parseFloat(valor) || 0,
          quantidade: parseInt(quantidade) || 0,
          quantidade_minima: parseInt(quantidade_minima) || 0,
          data_ultima_remeca: dataUltimaRemeca,
          quantidade_ultima_remeca: parseInt(quantidade_ultima_remeca) || 0,
        }),
      });

      if (res.ok) {
        alert("Produto adicionado com sucesso!");
        resetForm();
        router.push("/produtos")
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao adicionar produto.");
        
      }
    } catch (error) {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Adicionar Novo Produto
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload de Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem do Produto
              </label>
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Clique para fazer upload
                  </p>
                </div>
              </div>
            </div>

            {/* Nome do Produto */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome do Produto *
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Digite o nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Seção de Categoria */}
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categoria e Detalhes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Mascoulino">Mascolino</option>
                    <option value="Femilino">Feminino</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Camis">Mascolino</option>
                    <option value="Femilino">Feminino</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Preto, Azul, Vermelho"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marca
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Nike, Samsung, Apple"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tamanho
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: P, M, G, 42, Único"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descrição detalhada do produto"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Valor */}
            <div>
              <label
                htmlFor="valor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valor (R$) *
              </label>
              <input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Quantidade em Estoque */}
            <div>
              <label
                htmlFor="quantidade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade em Estoque *
              </label>
              <input
                id="quantidade"
                type="number"
                min="0"
                placeholder="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Quantidade Mínima */}
            <div>
              <label
                htmlFor="quantidade_minima"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade Mínima *
              </label>
              <input
                id="quantidade_minima"
                type="number"
                min="0"
                placeholder="0"
                value={quantidade_minima}
                onChange={(e) => setQuantidade_minima(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Data da Última Remessa */}
            <div>
              <label
                htmlFor="dataUltimaRemeca"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data da Última Remessa
              </label>
              <input
                id="dataUltimaRemeca"
                type="date"
                value={dataUltimaRemeca}
                onChange={(e) => setDataUltimaRemeca(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Quantidade da Última Remessa */}
            <div>
              <label
                htmlFor="quantidade_ultima_remeca"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade da Última Remessa
              </label>
              <input
                id="quantidade_ultima_remeca"
                type="number"
                min="0"
                placeholder="0"
                value={quantidade_ultima_remeca}
                onChange={(e) => setQuantidade_ultima_remeca(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Adicionando..." : "Adicionar Produto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
