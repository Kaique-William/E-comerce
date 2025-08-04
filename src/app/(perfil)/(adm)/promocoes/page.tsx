"use client";

import { useState } from "react";
import Tipo1 from "./(tipos)/@tipo1/page";
import Tipo2 from "./(tipos)/@tipo2/page";
import Tipo3 from "./(tipos)/@tipo3/page";

export default function Promocoes() {
    const [tipo, setTipo] = useState(1);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-4 mb-8">
                <button
                    className={`px-4 py-2 rounded ${tipo === 1 ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setTipo(1)}
                >
                    Tipo 1
                </button>
                <button
                    className={`px-4 py-2 rounded ${tipo === 2 ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setTipo(2)}
                >
                    Tipo 2
                </button>
                <button
                    className={`px-4 py-2 rounded ${tipo === 3 ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setTipo(3)}
                >
                    Tipo 3
                </button>
            </div>
            {tipo === 1 && <Tipo1 />}
            {tipo === 2 && <Tipo2 />}
            {tipo === 3 && <Tipo3 />}
        </div>
    );
}
