import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";
import { CreateToken } from "../../../../_lib/token";

export async function POST(req: NextRequest, res: NextResponse) {
    const db = await openDb();
    
    const { email } = req.json();

    if (!email) {
      return res.status(400).json({ message: "Email é necessário!" });
    }
 
    try {
      // Chama a função CreateToken para gerar o token
      const result = await CreateToken(email);

      if (result.token) {
        return res.status(200).json({ message: "Login bem-sucedido", token: result.token });
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao criar o token: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
