import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";
import { CreateToken } from "../../../../_lib/token";

export async function POST(req: NextRequest, res: NextResponse) {
  const db = await openDb();
  
  const { email, senha } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email é necessário!" }, { status: 400 });
  }

  try {
    // Chama a função CreateToken para gerar o token
    const search = await db.all(`SELECT * FROM Usuarios WHERE email = ?`, [email]);

    if(search.length > 0){
      const user = search[0];

      if(user.email === email && user.senha === senha){
        const token = await CreateToken(user);
    
        return NextResponse.json({ message: "Usuario Autenticado!", token:token }, { status: 200 });

      } else {
        return NextResponse.json({ message: "Credenciais inválidas!" }, { status:401 });
      }

    } else {
        return NextResponse.json({ message: "Usuario não encontrado!" }, { status: 404 });
    }
   
  } catch (error) {
    console.error("Erro ao autenticar: ", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
