import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";
import { CreateToken } from "../../../../_lib/token";

export async function POST(req: NextRequest, res: NextResponse) {
  const db = await openDb(); // Inicia a conexão com o banco
  
  const { email, senha } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email é necessário!" }, { status: 400 });
  }

  try {
    const search = await db.all(`SELECT * FROM Usuarios WHERE email = ?`, [email]); // Busca o usuário pelo email

    if(search.length > 0){
      const user = search[0];

      // Verifica se a senha está correta e cria o token de acesso
      if(user.email === email && user.senha === senha){
        const token = await CreateToken(user); // Gera o token de acesso
    
        return NextResponse.json({ message: "Usuario Autenticado!", token:token }, { status: 200 });

      } else {
        return NextResponse.json({ message: "Credenciais inválidas!" }, { status:401 });
      }

    } else {
        return NextResponse.json({ message: "Usuario não encontrado!" }, { status: 404 });
    }
   
  } catch (error) {
    console.error("Erro ao autenticar: ", error); // Se ocorrer algum erro fora dos casos acima, ele será exibido no console
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
