export default function Tipo3() {
    return (
        <div className="w-3/6 py-8">
            {/* Título da promoção */}
            <div className="bg-gray-500 text-center text-white py-2 rounded-t">
                <input
                    type="text"
                    placeholder="título da promoção"
                    className="bg-gray-500 text-white text-lg font-semibold w-full text-center outline-none"
                />
            </div>
            {/* Descrição da promoção */}
            <div className="bg-gray-200 text-center py-8 rounded-b mb-8">
                <textarea
                    placeholder="descrição da promoção"
                    className="bg-gray-200 text-gray-700 w-full text-center outline-none resize-none"
                    rows={2}
                />
            </div>

            {/* Item promocional */}
            <h2 className="text-center text-xl font-medium mb-4">item promocional</h2>
            <div className="flex items-center justify-center mb-2 gap-2">
                <span className="text-gray-700">valor da promoção</span>
                <input
                    type="number"
                    className="bg-gray-300 px-2 py-1 rounded w-20 text-center outline-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [appearance:textfield]"
                    min={0}
                />
            </div>
            <div className="bg-gray-300 p-6 rounded">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="pesquisar item"
                        className="w-1/2 px-2 py-1 rounded text-center bg-zinc-100"
                    />
                </div>
                <div className="text-center text-2xl font-bold text-gray-700">item</div>
            </div>
        </div>
    );
}