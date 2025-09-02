"use client";
import Cookies from "js-cookie";
import { User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BotaoPerfil() {
  const [clienteSidebarVisible, setClienteSidebarVisible] = useState(false);
  const [cargoUser, setCargoUser] = useState<string | null>(null);

  useEffect(() => {
    // Verifica o cargo do usuário quando o componente é montado
    const cargo = Cookies.get("cargoUser");
    setCargoUser(cargo || null);
  }, []);

  // Opções para cliente
  const opcoesCliente = ["Perfil", "Carrinho", "Compras"];

  // Opções para administrador
  const opcoesAdm = [
    "Vendas",
    "Produtos",
    "Promoções",
    "Histórico de Compras",
    "Histórico de Vendas",
    "Fatura/Despesas",
  ];

  // Mapeia as opções para as rotas corretas
  const mapearRotas = (opcao: string) => {
    const rotas: { [key: string]: string } = {
      // Rotas cliente
      Perfil: "/perfil",
      Carrinho: "/carrinho",
      Compras: "/compras",

      // Rotas administrador
      Produtos: "/produtos",
      Promoções: "/promocoes",
      Vendas: "/vendas",
      "Histórico de Compras": "/historico_compras",
      "Histórico de Vendas": "/historico_vendas",
      "Fatura/Despesas": "/fatura_despe",
    };
    return rotas[opcao] || "/";
  };

  const toggleClienteSidebar = () => {
    setClienteSidebarVisible(!clienteSidebarVisible);
  };

  const logout = () => {
    Cookies.remove("Token");
    Cookies.remove("User");
    Cookies.remove("cargoUser");
    Cookies.remove("id");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  // Define as opções baseadas no cargo
  const opcoes = cargoUser === "ADM" ? opcoesAdm : opcoesCliente;
  const titulo = cargoUser === "ADM" ? "Administrador" : "Usuário";

  return (
    <>
      {/* Botão cliente */}
      <div
        className="bg-white p-2 sm:p-2 md:p-3 rounded-full inline-block flex-shrink-0 cursor-pointer"
        onClick={toggleClienteSidebar}
      >
        <User className="w-4 h-4 text-black" />
      </div>

      {/* Sidebar cliente */}
      <div
        className={`fixed top-0 right-0 w-64 h-screen bg-gray-800 p-4 z-50 transform transition-transform duration-300 ${
          clienteSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{titulo}</h2>
          <button onClick={toggleClienteSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul>
          {opcoes.map((item) => (
            <li key={item} className="mb-2 cursor-pointer hover:text-gray-300">
              <Link href={mapearRotas(item)}>{item}</Link>
            </li>
          ))}
        </ul>

        <Link href="/login" passHref>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200">
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
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            Login
          </button>
        </Link>

        <div className="flex flex-col gap-3 mt-8">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
            onClick={logout}
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
