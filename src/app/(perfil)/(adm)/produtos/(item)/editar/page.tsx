"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Item {
  id_produto: number;
  nome: string;
  valor: number;
  quantidade: number;
  quantidade_minima: number;
  data_ultima_remeca: string;
  quantidade_ultima_remeca: number;
}

export default function Editar() {
  const searchParams = useSearchParams();
  const id_produto = searchParams.get("id_produto");
  const [item, setItem] = useState<Item | null>(null);

  console.log(id_produto);

  useEffect(() => {
    if (!id_produto) return;
    const fetchData = async () => {
      const response = await fetch(`/produtos/api/${id_produto}`);
      const data = await response.json();
      setItem(data);
    };
    fetchData();
  }, [id_produto]);

  const handleEditar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!item) return;
    await fetch("/produtos/api", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  console.log(item);
  
  return (
    <div>
      <h1>Editar Produto</h1>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            handleEditar(e);
        }}
      >
        <input
          type="text"
          value={item?.nome || ""}
          placeholder={item?.nome || ""}
          onChange={(event) =>
            setItem((prev) => ({ ...prev!, nome: event.target.value }))
          }
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
