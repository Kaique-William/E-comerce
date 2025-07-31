export default function Carrinho() {
  // Exemplo de dados (substitua pelo seu fetch futuramente)
  const itens = [
    {
      id: 1,
      nome: "Produto Exemplo",
      codigoItem: "A1B2C3",
      valor: "R$ 99,90",
      foto: "", // url da imagem se houver
    },
    {
      id: 2,
      nome: "Produto Exemplo",
      codigoItem: "A1B2C3",
      valor: "R$ 99,90",
      foto: "", // url da imagem se houver
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {itens.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-8 px-8 gap-7 border-b"
          >
            <div className="w-5 h-5 border border-black"></div>
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
              foto do item
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="mb-4 text-center">nome do item: {item.nome}</h1>
                <h1 className="mb-4 text-center">
                  codigo do item: {item.codigoItem}
                </h1>
              </div>
              <div className="flex items-center justify-between gap-4 mt-4">
                <span className="text-center w-40 py-2">{item.valor}</span>
                <button className="bg-gray-200 px-4 py-2">
                  confirmar compra
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
