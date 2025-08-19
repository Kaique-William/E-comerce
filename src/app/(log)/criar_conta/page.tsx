"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarConta() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    endereco: "",
  });
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/conta_cliente/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMensagem("Conta criada com sucesso!");
      setForm({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        endereco: "",
      });

      router.push("/login")
    } else {
      const data = await res.json();
      setMensagem(data.error || "Erro ao criar conta.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4">Criar Conta</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="border p-2 mb-2 w-full"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className="border p-2 mb-2 w-full"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          className="border p-2 mb-2 w-full"
          value={form.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          className="border p-2 mb-2 w-full"
          value={form.endereco}
          onChange={handleChange}
        />
        <button type="submit" className="bg-amber-400 px-4 py-2 rounded w-full">
          Criar Conta
        </button>
        {mensagem && (
          <div className="mt-4 text-center text-red-500">{mensagem}</div>
        )}
      </form>
    </div>
  );
}
