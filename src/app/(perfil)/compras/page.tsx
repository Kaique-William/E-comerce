export default function Compras() {
  // Exemplo de dados (substitua pelo seu fetch futuramente)
  const compras = [
    {
      id: 1,
      nome: "Produto Exemplo",
      numeroPedido: "12345",
      codigoItem: "A1B2C3",
      valor: "R$ 99,90",
      dataCompra: "01/08/2025",
      dataEstimadaEntrega: "05/08/2025",
      foto: "", // url da imagem se houver
    },
    {
      id: 2,
      nome: "Produto Exemplo 2",
      numeroPedido: "67890",
      codigoItem: "D4E5F6",
      valor: "R$ 149,90",
      dataCompra: "02/08/2025",
      dataEstimadaEntrega: "07/08/2025",
      foto: "",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {compras.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-8 px-8 gap-7 border-b"
          >
            {/* Foto do item */}
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
              foto do item
            </div>
            {/* Informações */}
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="mb-4 text-center">nome do item: {item.nome}</h1>
                <h1 className="mb-4 text-center">numero do pedido: {item.numeroPedido}</h1>
                <h1 className="mb-4 text-center">codigo do item: {item.codigoItem}</h1>
              </div>
              <div className="flex justify-between w-full mt-4">
                <span className="text-center w-40">data da compra {item.dataCompra}</span>
                <span className="text-center w-47 bg-amber-600">data estimada da entrega {item.dataEstimadaEntrega}</span>
                <span className="text-center w-40">{item.valor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}