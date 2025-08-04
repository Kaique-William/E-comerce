export default function Produtos() {
    return (
        <div className="w-full h-screen flex">
            {/* Sidebar de categorias */}
            <div className="h-full w-[350px] flex flex-col items-center justify-center bg-gray-500">
                <h1 className="text-white text-3xl">categorias</h1>
            </div>
            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col items-center pt-12">
                {/* Barra de pesquisa */}
                <div className="w-[600px] bg-gray-200 text-center py-2 mb-12">
                    pesquisa de itens
                </div>
                {/* Lista de itens */}
                <div className="w-full max-w-3xl flex flex-col items-center">
                    <div className="text-4xl mb-8">item</div>
                    <hr className="w-full mb-8" />
                </div>
            </div>
        </div>
    )
}