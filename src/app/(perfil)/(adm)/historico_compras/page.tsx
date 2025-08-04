export default function HistoricoCompras() {
  // Exemplo de dados (substitua pelo seu fetch futuramente)
  const compras = [
    {
      id: 1,
      nome: "Produto Exemplo",
      codigoItem: "A1B2C3",
      numeroPedido: "12345",
      quantidade: 10,
      valor: "R$ 500,00",
      dataCompra: "01/08/2025",
      dataEntrega: "05/08/2025",
      nomeFornecedor: "Fornecedor X",
      foto: "",
    },
  ];

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar de filtro */}
      <div className="h-full w-[350px] flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-black text-3xl">filtro</h1>
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {compras.map((item) => (
            <div
              key={item.id}
              className="flex items-center w-full py-8 gap-7 border-b"
            >
              {/* Foto do item */}
              <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-xs">
                foto do item
              </div>
              {/* Informações */}
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col items-center w-32">
                    <span className="mb-2">nome do item</span>
                    <span className="text-xs">{item.nome}</span>
                  </div>
                  <div className="flex flex-col items-center w-32">
                    <span className="mb-2">codigo do item</span>
                    <span className="text-xs">{item.codigoItem}</span>
                  </div>
                  <div className="flex flex-col items-center w-32">
                    <span className="mb-2">numero do pedido</span>
                    <span className="text-xs">{item.numeroPedido}</span>
                  </div>
                  <div className="flex flex-col items-center w-32">
                    <span className="mb-2">quantidade de itens</span>
                    <span className="text-xs">{item.quantidade}</span>
                  </div>
                  <div className="flex flex-col items-center w-32">
                    <span className="mb-2">valor da compra</span>
                    <span className="text-xs">{item.valor}</span>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-4">
                  <span className="text-center w-32">
                    data da compra
                    <br />
                    {item.dataCompra}
                  </span>
                  <span className="text-center w-32">
                    data da entrega
                    <br />
                    {item.dataEntrega}
                  </span>
                  <span className="text-center w-32">
                    nome do fornecedor
                    <br />
                    {item.nomeFornecedor}
                  </span>
                  <span className="text-center w-32"></span>
                  <span className="text-center w-32"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
