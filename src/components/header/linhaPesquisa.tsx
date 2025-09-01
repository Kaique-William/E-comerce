"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useFiltro } from "@/contexts/FiltroContext";

export default function LinhaPesquisa() {
    const { termoBusca, setTermoBusca } = useFiltro();
    const [inputValue, setInputValue] = useState(termoBusca);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTermoBusca(inputValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setTermoBusca(e.target.value);
    };

    return (
        <div className="flex items-center gap-2">
            <form onSubmit={handleSubmit} className="flex-1 px-2 sm:px-4 max-w-md mx-2">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="bg-gray-700 p-2 w-full rounded-full placeholder:text-center text-sm sm:text-base text-white"
                />
            </form>
            <button type="submit" onClick={handleSubmit}>
                <SearchIcon className="w-4 h-4 text-white" />
            </button>
        </div>
    )
}