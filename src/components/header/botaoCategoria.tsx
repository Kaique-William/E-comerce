"use client";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useFiltro } from "@/contexts/FiltroContext";
import Link from "next/link";
interface tipo {
  [categoria: string]: string[];
}

export default function BotaoCategoria() {
  const categorias = ["Masculino", "Feminino", "Unisex"];
  const tipos: tipo = {
    Masculino: [
      "Camisa",
      "Jaqueta",
      "Blusa",
      "Calça",
      "Calçados",
      "Bermuda",
      "Shorts",
      "Intimo",
      "Outros",
    ],
    Feminino: [
      "Camisa",
      "Jaqueta",
      "Blusa",
      "Vestido",
      "Saia",
      "Shorts",
      "Calça",
      "Calçados",
      "Intimo",
      "Outros",
    ],
    Unisex: [
      "Camisa",
      "Jaqueta",
      "Blusa",
      "Calça",
      "Calçados",
      "Shorts",
      "Outros",
    ],
  };

  const {
    categoriaSelecionada,
    tipoSelecionado,
    setCategoriaSelecionada,
    setTipoSelecionado,
  } = useFiltro();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleCategoriaClick = (categoria: string) => {
    if (categoria === categoriaSelecionada) {
      setCategoriaSelecionada(null);
      setTipoSelecionado(null);
    } else {
      setCategoriaSelecionada(categoria);
      setTipoSelecionado(null);
    }
  };

  const handleTipoClick = (tipo: string) => {
    setTipoSelecionado(tipo === tipoSelecionado ? null : tipo);
  };

  const toggleCategoriaSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      {/* Botão categorias */}
      <div
        className="bg-black p-2 sm:p-2 md:p-3 rounded-full inline-block flex-shrink-0 cursor-pointer"
        onClick={toggleCategoriaSidebar}
      >
        <Menu className="w-5 h-5" />
      </div>

      {/* Sidebar categorias */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 p-4 z-50 transform transition-transform duration-300 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Link Home */}
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </div>

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
                className={`cursor-pointer font-semibold hover:underline ${
                  categoriaSelecionada === categoria ? "text-blue-400" : ""
                }`}
                onClick={() => handleCategoriaClick(categoria)}
              >
                {categoria}
              </div>

              {categoriaSelecionada === categoria && (
                <ul className="ml-4 mt-2 space-y-1">
                  {tipos[categoria].map((tipo) => (
                    <li
                      key={tipo}
                      className={`cursor-pointer hover:text-gray-300 ${
                        tipoSelecionado === tipo ? "text-blue-300" : ""
                      }`}
                      onClick={() => handleTipoClick(tipo)}
                    >
                      {tipo}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
