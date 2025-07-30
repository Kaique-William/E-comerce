

export default function Conta_cliente() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center p-8">
            <h1>Dados pessoais</h1>
            <h1>nome: 
                <span className="text-blue-500">
                    Kwill
                </span>
            </h1>
            <h1>email: 
                <span className="text-blue-500">
                    5V0Jd@example.com
                </span>
            </h1>
            <h1>telefone: 
                <span className="text-blue-500">
                    (11) 99999-9999
                </span>
            </h1>
            <h1>Endereço: 
                <span className="text-blue-500">
                    Rua Exemplo, 123, São Paulo, SP
                </span>
            </h1>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
        </div>
    )
}