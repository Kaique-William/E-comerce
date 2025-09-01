import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await openDb();
  try {
    const produto = await db.get(
      `SELECT id_produto, nome, valor, quantidade, quantidade_minima,
              data_ultima_remeca, quantidade_ultima_remeca, categoria, tipo,
              color, marca, tamanho, descricao
       FROM Estoque WHERE id_produto = ?`,
      [params.id]
    );

    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
