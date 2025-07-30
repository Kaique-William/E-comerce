"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/conta_cliente/api", { method: "GET" });
    const data = await res.json();

    const usuario = data.find(
      (u: { email: string; senha: string }) =>
        u.email === email && u.senha === senha
    );

    if (usuario) {
      setMensagem("Login realizado com sucesso!");
      // Aqui você pode redirecionar ou salvar o usuário logado
    } else {
      setMensagem("Email ou senha inválidos.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md flex flex-col items-center"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 mb-4 w-full"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="bg-amber-400 px-4 py-2 rounded w-auto">
          Entrar
        </button>

        <p className="mt-4 text-center">Não tem uma conta? </p>

        <Link href="/criar_conta" passHref>
          <button
            type="button"
            className="bg-blue-500 text-black px-4 py-2 mt-4 rounded w-auto"
          >
            Criar Conta
          </button>
        </Link>

        {mensagem && (
          <div className="mt-4 text-center text-red-500">{mensagem}</div>
        )}
      </form>
    </div>
  );
}
