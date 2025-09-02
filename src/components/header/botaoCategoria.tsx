"use client";
import { useState } from "react";
import { X, Menu } from "lucide-react";

interface tipo {
    [categoria: string]: string[];
}

export default function BotaoCategoria() {
    const categorias = ["masculino", "feminino", "unisex"];
    const tipos: tipo = {
        masculino: ["Camisa", "Calça", "Calçados", "Vestido", "Saia", "Bermuda", "Jaqueta", "Blusa", "Shorts", "Intimo", "Outros"],
        feminino: ["Vestido", "Saia", "Blusa", "Calça", "Calçados", "Jaqueta", "Shorts", "Intimo", "Outros"],
        unisex: ["Camisa", "Calça", "Calçados", "Jaqueta", "Blusa", "Shorts", "Intimo", "Outros"]
    };

    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);


    const handleCategoriaClick = (categoria: string) => {
        setCategoriaSelecionada(categoria === categoriaSelecionada ? null : categoria);
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
        </>
    );
}
