"use client";
import { useState } from "react";
import { X, Menu, User } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";

interface categoria {
  [categoria: string]: string[]
}

export default function Header() {

  const categorias = ["masculino", "feminino", "unisex"];
  const tipos: categoria = {
    masculino: ["Camisa", "Calça", "Calçados", "Vestido", "Saia", "Bermuda", "Jaqueta", "Blusa", "Shorts", "Intimo", "Outros"],
    feminino: ["Vestido", "Saia", "Blusa", "Calça", "Calçados", "Jaqueta", "Shorts", "Intimo", "Outros"],
    unisex: ["Camisa", "Calça", "Calçados", "Jaqueta", "Blusa", "Shorts", "Intimo", "Outros"]
  };

  const cliente = ["Perfil", "Carrinho", "Compras"];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [clienteSidebarVisible, setClienteSidebarVisible] = useState(false);

  const handleCategoriaClick = (categoria: string) => {
    setCategoriaSelecionada(categoria === categoriaSelecionada ? null : categoria);
  };

  const toggleCategoriaSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setClienteSidebarVisible(false); // fecha cliente se abrir categorias
  };

  const toggleClienteSidebar = () => {
    setClienteSidebarVisible(!clienteSidebarVisible);
    setSidebarVisible(false); // fecha categorias se abrir cliente
  };

  const logout = () => {
    Cookies.remove("Token"); // nome do cookie que você usa
    Cookies.remove("User");  // se tiver outro
    Cookies.remove("cargoUser")
    Cookies.remove("id");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };


  return (
    <header className="bg-gray-800 text-white p-3 sm:p-4 flex items-center justify-between relative">
      {/* Botão categorias */}
      <div
        className="bg-black p-2 sm:p-2 md:p-3 rounded-full inline-block flex-shrink-0 cursor-pointer"
        onClick={toggleCategoriaSidebar}
      >
        <Menu className="w-5 h-5" />
      </div>

      {/* Sidebar categorias */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 p-4 z-50 transform transition-transform duration-300 ${sidebarVisible ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Categorias</h2>
          <button onClick={toggleCategoriaSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul>
          {categorias.map((categoria) => (
            <li key={categoria} className="mb-2">
              <div
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => handleCategoriaClick(categoria)}
              >
                {categoria}
              </div>

              {categoriaSelecionada === categoria && (
                <ul className="ml-4 mt-2 space-y-1">
                  {tipos[categoria].map((tipo) => (
                    <li key={tipo} className="cursor-pointer hover:text-gray-300">
                      {tipo}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <form action="" className="flex-1 px-2 sm:px-4 max-w-md mx-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 p-2 w-full rounded-full placeholder:text-center text-sm sm:text-base"
        />
      </form>

      {/* Botão cliente */}
      <div
        className="bg-white p-2 sm:p-2 md:p-3 rounded-full inline-block flex-shrink-0 cursor-pointer"
        onClick={toggleClienteSidebar}
      >
        <User className="w-4 h-4 text-black" />
      </div>

      {/* Sidebar cliente */}
      <div
        className={`fixed top-0 right-0 w-64 h-screen bg-gray-800 p-4 z-50 transform transition-transform duration-300 ${clienteSidebarVisible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Usuário</h2>
          <button onClick={toggleClienteSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul>
          {cliente.map((item) => (
            <li key={item} className="mb-2 cursor-pointer hover:text-gray-300">
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>

        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full"
          onClick={logout}>
          Sair
        </button>
      </div>
    </header>
  );
}
