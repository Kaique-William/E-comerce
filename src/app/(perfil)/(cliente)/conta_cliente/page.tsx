"use client";
import React, { useState, useEffect } from "react";

export default function Conta_cliente() {
  // Dados do cliente - em produção, virão de uma API
  const [cliente, setCliente] = useState({
    nome: "Kwill",
    email: "5V0Jd@example.com",
    telefone: "(11) 99999-9999",
    endereco: {
      rua: "Rua Exemplo",
      numero: "123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
    },
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1990",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false);
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
            <button
              onClick={
                isEditing ? () => setIsEditing(false) : () => setIsEditing(true)
              }
              className={`px-4 py-2 rounded-md font-medium transition-colors ${isEditing
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
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
                    value={cliente.nome}
                    onChange={(e) =>
                      setCliente({ ...cliente, nome: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={cliente.email}
                    onChange={(e) =>
                      setCliente({ ...cliente, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={cliente.telefone}
                    onChange={(e) =>
                      setCliente({ ...cliente, telefone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.telefone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={cliente.cpf}
                    onChange={(e) =>
                      setCliente({ ...cliente, cpf: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.cpf}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={cliente.dataNascimento}
                    onChange={(e) =>
                      setCliente({ ...cliente, dataNascimento: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.dataNascimento}</p>
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
                  Rua
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={cliente.endereco.rua}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        endereco: { ...cliente.endereco, rua: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.endereco.rua}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={cliente.endereco.numero}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: {
                            ...cliente.endereco,
                            numero: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{cliente.endereco.numero}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={cliente.endereco.complemento}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: {
                            ...cliente.endereco,
                            complemento: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {cliente.endereco.complemento}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={cliente.endereco.cidade}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: {
                            ...cliente.endereco,
                            cidade: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{cliente.endereco.cidade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={cliente.endereco.estado}
                      onChange={(e) =>
                        setCliente({
                          ...cliente,
                          endereco: {
                            ...cliente.endereco,
                            estado: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{cliente.endereco.estado}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={cliente.endereco.bairro}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        endereco: {
                          ...cliente.endereco,
                          bairro: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.endereco.bairro}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={cliente.endereco.cep}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        endereco: {
                          ...cliente.endereco,
                          cep: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{cliente.endereco.cep}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço Completo
              </label>
              {isEditing ? (
                <textarea
                  value={`${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.cidade}, ${cliente.endereco.estado}`}
                  onChange={(e) =>
                    setCliente({
                      ...cliente,
                      endereco: {
                        ...cliente.endereco,
                        rua: e.target.value.split(",")[0].trim(),
                        numero: e.target.value.split(",")[1].trim(),
                        cidade: e.target.value.split(",")[2].trim(),
                        estado: e.target.value.split(",")[3].trim(),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{`${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.cidade}, ${cliente.endereco.estado}`}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
