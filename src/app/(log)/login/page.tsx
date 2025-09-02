"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (data.token) {
      setMensagem("Login realizado com sucesso!");

      // Salva token e usuário nos coooookies
      Cookies.set("Token", data.token, { expires: 1, secure: true, sameSite: "strict" });

      const userValue = typeof data.user === "string" ? data.user : JSON.stringify(data.user);
      Cookies.set("User", userValue, { expires: 0.5, sameSite: "lax" });

      const cargoValue = typeof data.cargoUser === "string" ? data.cargoUser : JSON.stringify(data.cargoUser);
      Cookies.set("cargoUser", cargoValue, { expires: 0.5, sameSite: "lax" });

      const idValue = typeof data.id_usuario === "string" ? data.id_usuario : JSON.parse(data.id_usuario);
      Cookies.set("id", idValue, { expires: 0.5, sameSite: "lax" });

      window.location.reload();
    } else {
      setMensagem(data.message || "Erro ao fazer login");
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

        <p className="mt-4 text-center">Não tem uma conta?</p>

        <Link href="/criar_conta">
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
