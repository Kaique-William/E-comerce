"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Cliente {
  id_usuario: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cargo: string;
}

export default function Conta_cliente() {

  const [cliente, setCliente] = useState<Cliente>({
    id_usuario: 0,
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cargo: ""
  });

  const id = Cookies.get("id");
  useEffect(() => {
    const fetchCliente = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/info_cliente?id=${id}`);
          const data = await res.json();
          if (data && !data.error) {
            setCliente(data);
          }
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
        }
      }
    };
    fetchCliente();
  }, [id]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/info_cliente`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: cliente.id_usuario,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: cliente.endereco
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        alert("Dados salvos com sucesso!");
      } else {
        alert("Erro ao salvar dados");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar dados");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Conta</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais</p>
        </div>

        {/* Informações do Cliente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Dados Pessoais
            </h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-md font-medium transition-colors hover:bg-green-700"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md font-medium transition-colors hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-700"
                >
                  Editar
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={cliente.nome || ""}
                    onChange={(e) =>
                      setCliente({ ...cliente, nome: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.nome || "Não informado"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={cliente.email || ""}
                    onChange={(e) =>
                      setCliente({ ...cliente, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.email || "Não informado"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={cliente.telefone || ""}
                    onChange={(e) =>
                      setCliente({ ...cliente, telefone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.telefone || "Não informado"}</p>
                )}
              </div>


            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Endereço
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço Completo
                </label>
                {isEditing ? (
                  <textarea
                    value={cliente.endereco || ""}
                    onChange={(e) =>
                      setCliente({ ...cliente, endereco: e.target.value })
                    }
                    placeholder="Digite seu endereço completo"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[60px]">
                    {cliente.endereco || "Endereço não informado"}
                  </p>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  💡 Dica
                </h4>
                <p className="text-sm text-blue-700">
                  Para um endereço mais organizado, você pode incluir: rua, número,
                  bairro, cidade, estado e CEP em uma única linha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
