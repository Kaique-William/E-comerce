"use client";
import { useState } from "react";
import { X, Menu } from "lucide-react";

interface tipo {
    [categoria: string]: string[]
}

export default function BotaoCategoria() {

    const categorias = ["masculino", "feminino", "unisex"];
    const tipos: tipo = {
        masculino: ["Camisa", "Calça", "Bermuda", "Blusa", "Jaqueta", "Shorts", "Calçados", "Intimo", "Outros"],
        feminino: ["Camisa", "Calça", "Vestido", "Blusa", "Jaqueta", "Shorts", "Saia", "Calçados", "Intimo", "Outros"],
        unisex: ["Camisa", "Calça", "Calçados", "Jaqueta", "Blusa", "Shorts", "Intimo", "Outros"]
    };

    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleCategoriaClick = (categoria: string) => {
        if (categoriaSelecionada === categoria) {
            setCategoriaSelecionada(null);
            setTipoSelecionado(null);
        } else {
            setCategoriaSelecionada(categoria);
            setTipoSelecionado(null);
        }
    };

    const handleTipoClick = (tipo: string) => {
        setTipoSelecionado(tipo);
    };

    const toggleCategoriaSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const limparFiltros = () => {
        setCategoriaSelecionada(null);
        setTipoSelecionado(null);
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
                className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 p-4 z-50 transform transition-transform duration-300 ${sidebarVisible ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Categorias</h2>
                    <button onClick={toggleCategoriaSidebar}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Botão para limpar filtros */}
                {(categoriaSelecionada || tipoSelecionado) && (
                    <button
                        onClick={limparFiltros}
                        className="w-full mb-4 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                    >
                        Limpar Filtros
                    </button>
                )}

                <ul>
                    {categorias.map((categoria) => (
                        <li key={categoria} className="mb-2">
                            <div
                                className={`cursor-pointer font-semibold hover:underline ${categoriaSelecionada === categoria ? 'text-blue-400' : ''
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
                                            className={`cursor-pointer hover:text-gray-300 ${tipoSelecionado === tipo ? 'text-blue-400' : ''
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