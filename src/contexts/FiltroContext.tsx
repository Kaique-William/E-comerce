"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltroContextType {
    categoriaSelecionada: string | null;
    tipoSelecionado: string | null;
    termoBusca: string;
    setCategoriaSelecionada: (categoria: string | null) => void;
    setTipoSelecionado: (tipo: string | null) => void;
    setTermoBusca: (termo: string) => void;
    limparFiltros: () => void;
}

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export function FiltroProvider({ children }: { children: ReactNode }) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
    const [termoBusca, setTermoBusca] = useState<string>('');

    const limparFiltros = () => {
        setCategoriaSelecionada(null);
        setTipoSelecionado(null);
        setTermoBusca('');
    };

    return (
        <FiltroContext.Provider
            value={{
                categoriaSelecionada,
                tipoSelecionado,
                termoBusca,
                setCategoriaSelecionada,
                setTipoSelecionado,
                setTermoBusca,
                limparFiltros,
            }}
        >
            {children}
        </FiltroContext.Provider>
    );
}

export function useFiltro() {
    const context = useContext(FiltroContext);
    if (context === undefined) {
        throw new Error('useFiltro deve ser usado dentro de um FiltroProvider');
    }
    return context;
}
