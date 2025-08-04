export default async function Vendas() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col px-8 border-b">
          <div className="flex items-center py-3 gap-7">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
              foto do cliente
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="mb-4 text-center">nome do cliente</h1>
                <h1 className="mb-4 text-center">numero de telefone</h1>
                <h1 className="mb-4 text-center">id do cliente</h1>
              </div>
              <h1>endereço</h1>
              <div className="flex justify-between w-full mt-4">
                <h1>compras realizadas</h1>
                <h1>quantidade de itens comprados</h1>
              </div>
            </div>
          </div>
          <h1>visualizar pedido</h1>
          <div className="flex items-center py-3 px-15 gap-10">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs">
              foto do cliente
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="mb-4 text-center">nome do item</h1>
                <h1 className="mb-4 text-center">codigo do item</h1>
              </div>
              <div className="flex justify-between w-full mt-4">
                <h1>quantidade</h1>
                <h1>valor do item</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-4">
            <h1>Total</h1>
            <button>
              <h1>confirmar venda</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
