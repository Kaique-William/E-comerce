"use client";
import React, { useState } from "react";

export default function Adicionar() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [quantidade_minima, setQuantidade_minima] = useState(0);
  const [quantidade_ultima_remeca, setQuantidade_ultima_remeca] = useState(0);
  const [dataUltimaRemeca, setDataUltimaRemeca] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log("Adicionar produto:", {
    //   nome,
    //   valor,
    //   quantidade,
    //   quantidade_minima,
    //   data_ultima_remeca: dataUltimaRemeca,
    //   quantidade_ultima_remeca,
    // });

    const res = await fetch("/produtos/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        valor,
        quantidade,
        quantidade_minima,
        data_ultima_remeca: dataUltimaRemeca,
        quantidade_ultima_remeca,
      }),
    });

    // console.log("Resposta do servidor:", res);

    if (res.ok) {
      alert("Produto adicionado com sucesso!");
    } else {
      const data = await res.json();
      console.error("Erro ao adicionar produto:", data.error || "Erro ao adicionar produto.");
      alert(data.error || "Erro ao adicionar produto.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 pt-12">
      <div className="w-40 h-40 flex items-center justify-center bg-amber-400">
        foto
      </div>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nome do item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="valor"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="quantidade minima"
          value={quantidade_minima}
          onChange={(e) => setQuantidade_minima(Number(e.target.value))}
        />
        <input
          type="date"
          value={dataUltimaRemeca}
          onChange={(e) => setDataUltimaRemeca(e.target.value)}
        />
        <input
          type="number"
          placeholder="quantidade ultima remeca"
          value={quantidade_ultima_remeca}
          onChange={(e) => setQuantidade_ultima_remeca(Number(e.target.value))}
        />
        <button type="submit">adicionar</button>
      </form>
    </div>
  );
}
